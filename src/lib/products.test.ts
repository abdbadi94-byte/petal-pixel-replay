import { describe, expect, it } from "vitest";
import { PRODUCTS, cartTotal, buildWhatsAppMessage, whatsappUrl } from "./products";

const price = (id: string) => PRODUCTS.flatMap((p) => p.variants).find((v) => v.id === id)?.price;

describe("pricing (SAR)", () => {
  it("loose leaf: 50g=25, 100g=50, 220g=100", () => {
    expect([price("loose-50"), price("loose-100"), price("loose-220")]).toEqual([25, 50, 100]);
  });
  it("tea bags: 6=25, 15=50, 30=100", () => {
    expect([price("bags-6"), price("bags-15"), price("bags-30")]).toEqual([25, 50, 100]);
  });
  it("totals quantities", () => {
    expect(cartTotal([{ productId: "loose", variantId: "loose-100", qty: 2 }, { productId: "bags", variantId: "bags-6", qty: 1 }])).toBe(125);
  });
});

describe("whatsapp checkout", () => {
  it("targets +966503267602 with total and customer name", () => {
    const msg = buildWhatsAppMessage([{ productId: "bags", variantId: "bags-30", qty: 1 }], { name: "Sara", phone: "1", city: "Riyadh", address: "x", notes: "" });
    expect(msg).toContain("Total: 100 SAR");
    expect(msg).toContain("Name: Sara");
    expect(whatsappUrl(msg).startsWith("https://wa.me/966503267602?text=")).toBe(true);
  });
});
