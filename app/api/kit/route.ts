import { buildKit, Profile, templateBrief } from "@/lib/recommend";

// Rules choose the kit (predictable, testable, never recommends a wrong shade).
// The LLM only writes the advisor brief about items already chosen; its output is
// checked, and the rule-based brief is used if the model is unavailable or invalid.
export async function POST(req: Request) {
  let profile: Profile;
  try { profile = await req.json(); } catch { return Response.json({ detail: "invalid JSON" }, { status: 400 }); }
  if (!profile?.skin || !profile?.undertone || !Array.isArray(profile?.wants) || !profile.wants.length) {
    return Response.json({ detail: "skin, undertone and at least one category are required" }, { status: 422 });
  }
  const kit = buildKit(profile);
  let brief = templateBrief(profile, kit);
  let briefSource: "ai" | "rules" = "rules";
  const key = process.env.GEMINI_API_KEY;
  if (key && kit.length) {
    try {
      const items = kit.map((k) => `${k.product.id}: ${k.product.brand} ${k.product.name} (₹${k.product.price}) — ${k.reasons.join("; ")}`).join("\n");
      const prompt = `You brief a beauty advisor before a home visit. Customer profile: ${JSON.stringify(profile)}.\n` +
        `Kit (do not add products that are not listed):\n${items}\n` +
        `Write 3-4 short sentences: what to try first and why, how to approach shade matching, and one thing to avoid. ` +
        `Return JSON only: {"brief": string}.`;
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? "gemini-flash-lite-latest"}:generateContent?key=${key}`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, responseMimeType: "application/json" } }),
        signal: AbortSignal.timeout(15000),
      });
      if (r.ok) {
        const data = await r.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        const parsed = JSON.parse(text);
        if (typeof parsed.brief === "string" && parsed.brief.length > 20 && parsed.brief.length < 900) {
          brief = parsed.brief; briefSource = "ai";
        }
      }
    } catch { /* keep the rule-based brief */ }
  }
  return Response.json({ kit, brief, briefSource, kitValue: kit.reduce((s, k) => s + k.product.price, 0) });
}
