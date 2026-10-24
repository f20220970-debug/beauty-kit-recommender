import { describe, expect, it } from "vitest";
import { buildKit, score, Profile } from "./recommend";
import { CATALOG } from "./catalog";

const base: Profile = { skin: "oily", undertone: "warm", concerns: ["acne", "oiliness"], occasion: "office",
  budget: "2000-3500", wants: ["Skincare", "Sunscreen", "Base", "Concealer", "Lips", "Eyes", "Fragrance"] };

describe("recommendation rules", () => {
  it("never puts a wrong-undertone shade in the kit", () => {
    const kit = buildKit(base);
    for (const k of kit) if (k.product.undertone) expect(k.product.undertone).toContain("warm");
  });
  it("respects skin type filters", () => {
    for (const k of buildKit(base)) if (k.product.skin.length) expect(k.product.skin).toContain("oily");
  });
  it("ranks concern matches higher and explains why", () => {
    const serum = score(CATALOG.find((p) => p.id === "sk2")!, base)!;
    expect(serum.reasons.join(" ")).toContain("targets acne and oiliness");
  });
  it("caps the kit and per-category counts", () => {
    const kit = buildKit(base, 14);
    expect(kit.length).toBeLessThanOrEqual(14);
    const counts: Record<string, number> = {};
    kit.forEach((k) => (counts[k.product.category] = (counts[k.product.category] ?? 0) + 1));
    expect(counts["Fragrance"] ?? 0).toBeLessThanOrEqual(1);
    Object.values(counts).forEach((n) => expect(n).toBeLessThanOrEqual(2));
  });
  it("always gives the advisor at least one reason", () => {
    for (const k of buildKit({ ...base, occasion: "wedding" })) expect(k.reasons.length).toBeGreaterThan(0);
  });
  it("only includes categories the customer wants", () => {
    const kit = buildKit({ ...base, wants: ["Lips"] });
    expect(kit.every((k) => k.product.category === "Lips")).toBe(true);
  });
});
