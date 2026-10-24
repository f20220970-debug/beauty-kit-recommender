// Sample catalogue: fictional brands and illustrative prices, for the prototype only.
export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";
export type Undertone = "warm" | "cool" | "neutral";
export type Concern = "dullness" | "acne" | "pigmentation" | "fine lines" | "redness" | "dehydration" | "oiliness" | "dark circles";
export type Category = "Skincare" | "Sunscreen" | "Base" | "Concealer" | "Lips" | "Eyes" | "Fragrance";

export interface Product {
  id: string; name: string; brand: string; category: Category; price: number;
  skin: SkinType[];            // skin types it suits ([] = all)
  undertone?: Undertone[];     // for shade-led products
  concerns: Concern[];
  occasions: Occasion[];
}
export type Occasion = "everyday" | "office" | "evening" | "wedding";

const ALL: Occasion[] = ["everyday", "office", "evening", "wedding"];
export const CATALOG: Product[] = [
  { id: "sk1", name: "Hyaluronic Barrier Serum", brand: "Aurelle", category: "Skincare", price: 2400, skin: ["dry", "normal", "sensitive"], concerns: ["dehydration", "fine lines"], occasions: ALL },
  { id: "sk2", name: "Niacinamide Clarity Serum", brand: "Kaeru", category: "Skincare", price: 1900, skin: ["oily", "combination"], concerns: ["acne", "oiliness", "pigmentation"], occasions: ALL },
  { id: "sk3", name: "Vitamin C Glow Drops", brand: "Solenne", category: "Skincare", price: 2800, skin: ["normal", "combination", "dry", "oily"], concerns: ["dullness", "pigmentation"], occasions: ALL },
  { id: "sk4", name: "Calming Cica Cream", brand: "Aurelle", category: "Skincare", price: 2200, skin: ["sensitive", "dry"], concerns: ["redness", "dehydration"], occasions: ALL },
  { id: "sk5", name: "Oil-Free Gel Moisturiser", brand: "Kaeru", category: "Skincare", price: 1600, skin: ["oily", "combination"], concerns: ["oiliness", "acne"], occasions: ALL },
  { id: "sk6", name: "Retinal Night Treatment", brand: "Solenne", category: "Skincare", price: 3400, skin: ["normal", "combination", "oily"], concerns: ["fine lines", "pigmentation"], occasions: ALL },
  { id: "sk7", name: "Caffeine Eye Cream", brand: "Mirelle", category: "Skincare", price: 2100, skin: [], concerns: ["dark circles", "fine lines"], occasions: ALL },
  { id: "sk8", name: "Rich Ceramide Moisturiser", brand: "Aurelle", category: "Skincare", price: 2600, skin: ["dry", "sensitive", "normal"], concerns: ["dehydration", "redness"], occasions: ALL },
  { id: "ss1", name: "Invisible Fluid SPF 50", brand: "Solenne", category: "Sunscreen", price: 1800, skin: ["oily", "combination", "normal"], concerns: ["pigmentation", "oiliness"], occasions: ["everyday", "office"] },
  { id: "ss2", name: "Mineral Sensitive SPF 50", brand: "Aurelle", category: "Sunscreen", price: 2000, skin: ["sensitive", "dry", "normal"], concerns: ["redness", "pigmentation"], occasions: ["everyday", "office"] },
  { id: "ss3", name: "Dewy Glow SPF 40", brand: "Mirelle", category: "Sunscreen", price: 1700, skin: ["dry", "normal"], concerns: ["dullness", "dehydration"], occasions: ["everyday", "office"] },
  { id: "bs1", name: "Skin Tint, Warm 3", brand: "Mirelle", category: "Base", price: 2900, skin: ["dry", "normal", "combination"], undertone: ["warm"], concerns: ["dullness"], occasions: ["everyday", "office"] },
  { id: "bs2", name: "Skin Tint, Cool 3", brand: "Mirelle", category: "Base", price: 2900, skin: ["dry", "normal", "combination"], undertone: ["cool"], concerns: ["dullness"], occasions: ["everyday", "office"] },
  { id: "bs3", name: "Skin Tint, Neutral 3", brand: "Mirelle", category: "Base", price: 2900, skin: ["dry", "normal", "combination"], undertone: ["neutral"], concerns: ["dullness"], occasions: ["everyday", "office"] },
  { id: "bs4", name: "Matte Foundation, Warm 4", brand: "Velour", category: "Base", price: 3600, skin: ["oily", "combination"], undertone: ["warm"], concerns: ["oiliness", "acne"], occasions: ["office", "evening", "wedding"] },
  { id: "bs5", name: "Matte Foundation, Cool 4", brand: "Velour", category: "Base", price: 3600, skin: ["oily", "combination"], undertone: ["cool"], concerns: ["oiliness", "acne"], occasions: ["office", "evening", "wedding"] },
  { id: "bs6", name: "Matte Foundation, Neutral 4", brand: "Velour", category: "Base", price: 3600, skin: ["oily", "combination"], undertone: ["neutral"], concerns: ["oiliness", "acne"], occasions: ["office", "evening", "wedding"] },
  { id: "bs7", name: "Luminous Foundation, Warm 4", brand: "Velour", category: "Base", price: 3800, skin: ["dry", "normal"], undertone: ["warm"], concerns: ["dullness", "fine lines"], occasions: ["evening", "wedding"] },
  { id: "bs8", name: "Luminous Foundation, Cool 4", brand: "Velour", category: "Base", price: 3800, skin: ["dry", "normal"], undertone: ["cool"], concerns: ["dullness", "fine lines"], occasions: ["evening", "wedding"] },
  { id: "bs9", name: "Luminous Foundation, Neutral 4", brand: "Velour", category: "Base", price: 3800, skin: ["dry", "normal"], undertone: ["neutral"], concerns: ["dullness", "fine lines"], occasions: ["evening", "wedding"] },
  { id: "bs10", name: "Sensitive Skin Fluid, Neutral 3", brand: "Aurelle", category: "Base", price: 3200, skin: ["sensitive"], undertone: ["neutral", "warm", "cool"], concerns: ["redness"], occasions: ALL },
  { id: "cn1", name: "Brightening Concealer, Peach", brand: "Velour", category: "Concealer", price: 2300, skin: [], undertone: ["warm", "neutral"], concerns: ["dark circles"], occasions: ALL },
  { id: "cn2", name: "Brightening Concealer, Rose", brand: "Velour", category: "Concealer", price: 2300, skin: [], undertone: ["cool"], concerns: ["dark circles"], occasions: ALL },
  { id: "cn3", name: "Spot Cover Concealer", brand: "Kaeru", category: "Concealer", price: 1900, skin: ["oily", "combination"], undertone: ["warm", "neutral", "cool"], concerns: ["acne", "pigmentation"], occasions: ALL },
  { id: "lp1", name: "Satin Lipstick, Brick Red", brand: "Solenne", category: "Lips", price: 2200, skin: [], undertone: ["warm"], concerns: [], occasions: ["evening", "wedding"] },
  { id: "lp2", name: "Satin Lipstick, Berry", brand: "Solenne", category: "Lips", price: 2200, skin: [], undertone: ["cool"], concerns: [], occasions: ["evening", "wedding"] },
  { id: "lp3", name: "Satin Lipstick, Rosewood", brand: "Solenne", category: "Lips", price: 2200, skin: [], undertone: ["neutral", "warm", "cool"], concerns: [], occasions: ["everyday", "office", "evening"] },
  { id: "lp4", name: "Tinted Lip Balm, Nude Pink", brand: "Mirelle", category: "Lips", price: 1200, skin: [], undertone: ["cool", "neutral"], concerns: [], occasions: ["everyday", "office"] },
  { id: "lp5", name: "Tinted Lip Balm, Caramel", brand: "Mirelle", category: "Lips", price: 1200, skin: [], undertone: ["warm", "neutral"], concerns: [], occasions: ["everyday", "office"] },
  { id: "ey1", name: "Tubing Mascara", brand: "Velour", category: "Eyes", price: 1900, skin: [], concerns: [], occasions: ALL },
  { id: "ey2", name: "Bronze Eyeshadow Quad", brand: "Velour", category: "Eyes", price: 3200, skin: [], undertone: ["warm", "neutral"], concerns: [], occasions: ["evening", "wedding"] },
  { id: "ey3", name: "Plum Eyeshadow Quad", brand: "Velour", category: "Eyes", price: 3200, skin: [], undertone: ["cool", "neutral"], concerns: [], occasions: ["evening", "wedding"] },
  { id: "ey4", name: "Smudge-Proof Kohl", brand: "Kaeru", category: "Eyes", price: 900, skin: [], concerns: [], occasions: ALL },
  { id: "fr1", name: "Fig & Cedar Eau de Parfum", brand: "Maison Elan", category: "Fragrance", price: 6500, skin: [], concerns: [], occasions: ["office", "everyday"] },
  { id: "fr2", name: "Jasmine Night Eau de Parfum", brand: "Maison Elan", category: "Fragrance", price: 7200, skin: [], concerns: [], occasions: ["evening", "wedding"] },
  { id: "fr3", name: "Citrus Musk Body Mist", brand: "Mirelle", category: "Fragrance", price: 1500, skin: [], concerns: [], occasions: ["everyday"] },
];
