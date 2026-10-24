import { CATALOG, Category, Concern, Occasion, Product, SkinType, Undertone } from "./catalog";

export interface Profile {
  skin: SkinType; undertone: Undertone; concerns: Concern[]; occasion: Occasion;
  budget: "under 2000" | "2000-3500" | "3500+"; wants: Category[];
}
export interface KitItem { product: Product; score: number; reasons: string[] }

const BUDGET_MAX: Record<Profile["budget"], number> = { "under 2000": 2000, "2000-3500": 3500, "3500+": Infinity };

// Score every product for a profile. Hard filters first (skin type, undertone, budget, wanted category),
// then points for each matching concern and the occasion. Returns reasons so the advisor sees why.
export function score(p: Product, f: Profile): KitItem | null {
  if (!f.wants.includes(p.category)) return null;
  if (p.skin.length && !p.skin.includes(f.skin)) return null;
  if (p.undertone && !p.undertone.includes(f.undertone)) return null;
  if (p.price > BUDGET_MAX[f.budget] * 1.25) return null;   // allow a little stretch above budget
  const reasons: string[] = [];
  let s = 1;
  if (p.skin.length) { s += 2; reasons.push(`made for ${f.skin} skin`); }
  if (p.undertone) { s += 2; reasons.push(`suits a ${f.undertone} undertone`); }
  const hits = p.concerns.filter((c) => f.concerns.includes(c));
  if (hits.length) { s += 3 * hits.length; reasons.push(`targets ${hits.join(" and ")}`); }
  if (p.occasions.includes(f.occasion)) { s += 1.5; reasons.push(`right for ${f.occasion}`); }
  if (p.price > BUDGET_MAX[f.budget]) { s -= 2; reasons.push("slightly above budget: show as a stretch option"); }
  if (!reasons.length) reasons.push(`within budget in a category you asked to try (not a ${f.occasion} match)`);
  return { product: p, score: s, reasons };
}

// Build a kit: best items per category (2 per category, 1 for fragrance), capped at maxItems.
export function buildKit(f: Profile, maxItems = 14): KitItem[] {
  const scored = CATALOG.map((p) => score(p, f)).filter((x): x is KitItem => x !== null)
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price);
  const perCat: Record<string, number> = {};
  const kit: KitItem[] = [];
  for (const item of scored) {
    const cap = item.product.category === "Fragrance" ? 1 : 2;
    if ((perCat[item.product.category] ?? 0) >= cap) continue;
    perCat[item.product.category] = (perCat[item.product.category] ?? 0) + 1;
    kit.push(item);
    if (kit.length >= maxItems) break;
  }
  return kit;
}

export function templateBrief(f: Profile, kit: KitItem[]): string {
  const cats = Array.from(new Set(kit.map((k) => k.product.category))).join(", ");
  return `Customer has ${f.skin} skin with a ${f.undertone} undertone, wants help with ${f.concerns.join(", ") || "general care"}, ` +
    `shopping for ${f.occasion} within ${f.budget}. Kit covers ${cats}. Start with skincare prep, then base shade match, ` +
    `then colour. Note stretch-budget items before trying them.`;
}
