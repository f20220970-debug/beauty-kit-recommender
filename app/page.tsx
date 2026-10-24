"use client";
import { useState } from "react";
import type { KitItem, Profile } from "@/lib/recommend";

const CATS = ["Skincare", "Sunscreen", "Base", "Concealer", "Lips", "Eyes", "Fragrance"] as const;
const CONCERNS = ["dullness", "acne", "pigmentation", "fine lines", "redness", "dehydration", "oiliness", "dark circles"] as const;

function Radio({ name, value, label, checked, onChange }: { name: string; value: string; label: string; checked: boolean; onChange: () => void }) {
  return <label className="opt"><input type="radio" name={name} value={value} checked={checked} onChange={onChange} /><span>{label}</span></label>;
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="opt"><input type="checkbox" checked={checked} onChange={onChange} /><span>{label}</span></label>;
}

export default function Home() {
  const [p, setP] = useState<Profile>({ skin: "combination", undertone: "warm", concerns: ["dullness"], occasion: "everyday", budget: "2000-3500", wants: ["Skincare", "Sunscreen", "Base", "Lips"] });
  const [res, setRes] = useState<{ kit: KitItem[]; brief: string; briefSource: string; kitValue: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const toggle = <T,>(list: T[], x: T) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    if (!p.wants.length) return setErr("Pick at least one category.");
    setBusy(true);
    const r = await fetch("/api/kit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(p) });
    setBusy(false);
    if (!r.ok) return setErr("Couldn't build a kit. Check your answers and try again.");
    setRes(await r.json());
  }

  return (
    <>
      <h1>Your beauty profile</h1>
      <p className="lede">Answer six quick questions before your home visit, and your advisor arrives with a kit chosen for you. A prototype of the PRD in the Wingit product case; products and prices are fictional samples.</p>
      <form onSubmit={submit}>
        <fieldset><legend>Skin type</legend><div className="opts">
          {(["dry", "oily", "combination", "normal", "sensitive"] as const).map((s) => <Radio key={s} name="skin" value={s} label={s} checked={p.skin === s} onChange={() => setP({ ...p, skin: s })} />)}
        </div></fieldset>
        <fieldset><legend>Undertone</legend><div className="opts">
          {(["warm", "cool", "neutral"] as const).map((s) => <Radio key={s} name="tone" value={s} label={s} checked={p.undertone === s} onChange={() => setP({ ...p, undertone: s })} />)}
        </div><p className="note">Not sure? Veins look greenish: warm. Bluish: cool. Both: neutral.</p></fieldset>
        <fieldset><legend>What would you like help with?</legend><div className="opts">
          {CONCERNS.map((c) => <Check key={c} label={c} checked={p.concerns.includes(c)} onChange={() => setP({ ...p, concerns: toggle(p.concerns, c) })} />)}
        </div></fieldset>
        <fieldset><legend>Occasion</legend><div className="opts">
          {(["everyday", "office", "evening", "wedding"] as const).map((s) => <Radio key={s} name="occ" value={s} label={s} checked={p.occasion === s} onChange={() => setP({ ...p, occasion: s })} />)}
        </div></fieldset>
        <fieldset><legend>Budget per product</legend><div className="opts">
          {(["under 2000", "2000-3500", "3500+"] as const).map((s) => <Radio key={s} name="bud" value={s} label={`₹ ${s}`} checked={p.budget === s} onChange={() => setP({ ...p, budget: s })} />)}
        </div></fieldset>
        <fieldset><legend>What do you want to try?</legend><div className="opts">
          {CATS.map((c) => <Check key={c} label={c} checked={p.wants.includes(c)} onChange={() => setP({ ...p, wants: toggle(p.wants, c) })} />)}
        </div></fieldset>
        <button type="submit" disabled={busy}>{busy ? "Building your kit…" : "Build my kit"}</button>
        {err && <p className="err">{err}</p>}
      </form>

      {res && (
        <section className="result" aria-live="polite">
          <div className="brief"><b>Advisor brief {res.briefSource === "ai" ? "(AI-written)" : "(rule-based)"}</b>{res.brief}</div>
          <p className="note">{res.kit.length} products · kit value ₹{res.kitValue.toLocaleString("en-IN")} · you pay only for what you keep</p>
          {res.kit.length === 0 ? <p>No products match those answers. Try a wider budget or more categories.</p> : (
            <div className="grid">
              {res.kit.map((k) => (
                <div className="card" key={k.product.id}>
                  <small>{k.product.category} · {k.product.brand}</small>
                  <h3>{k.product.name}</h3>
                  <div>₹{k.product.price.toLocaleString("en-IN")}</div>
                  <p>Why: {k.reasons.join("; ")}.</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
