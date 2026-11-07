export type Variant = { id: string; labelEn: string; labelAr: string; price: number };
export type Product = {
  id: "loose" | "bags";
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  variants: Variant[];
};

export const WHATSAPP_NUMBER = "966503267602";
export const PHONE_DISPLAY = "0503267602";

export const PRODUCTS: Product[] = [
  {
    id: "loose",
    nameEn: "Premium Loose Leaf Tea",
    nameAr: "شاي الزهور السائب الفاخر",
    descEn: "A hand-blended medley of rose buds, chamomile, cornflower and calendula petals.",
    descAr: "مزيج مختار يدوياً من براعم الورد والبابونج وزهرة الذرة وبتلات الآذريون.",
    variants: [
      { id: "loose-50", labelEn: "Small — 50g", labelAr: "صغير — ٥٠ جرام", price: 25 },
      { id: "loose-100", labelEn: "Medium — 100g", labelAr: "وسط — ١٠٠ جرام", price: 50 },
      { id: "loose-220", labelEn: "Large — 220g", labelAr: "كبير — ٢٢٠ جرام", price: 100 },
    ],
  },
  {
    id: "bags",
    nameEn: "Premium Tea Bags",
    nameAr: "أكياس شاي الزهور الفاخرة",
    descEn: "Our signature flower blend in silken pyramid bags — beautiful, simple, ready to steep.",
    descAr: "مزيجنا المميز في أكياس هرمية حريرية — جميلة وسهلة وجاهزة للتحضير.",
    variants: [
      { id: "bags-6", labelEn: "6 Tea Bags", labelAr: "٦ أكياس", price: 25 },
      { id: "bags-15", labelEn: "15 Tea Bags", labelAr: "١٥ كيس", price: 50 },
      { id: "bags-30", labelEn: "30 Tea Bags", labelAr: "٣٠ كيس", price: 100 },
    ],
  },
];

export type CartLine = { productId: Product["id"]; variantId: string; qty: number };

export function findLine(line: CartLine) {
  const product = PRODUCTS.find((p) => p.id === line.productId);
  const variant = product?.variants.find((v) => v.id === line.variantId);
  return product && variant ? { product, variant } : null;
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (findLine(l)?.variant.price ?? 0) * l.qty, 0);
}

export type Customer = { name: string; phone: string; city: string; address: string; notes: string };

export function buildWhatsAppMessage(lines: CartLine[], c: Customer) {
  const items = lines
    .map((l, i) => {
      const f = findLine(l);
      if (!f) return "";
      return `${i + 1}. ${f.product.nameEn} (${f.variant.labelEn}) × ${l.qty} = ${f.variant.price * l.qty} SAR`;
    })
    .filter(Boolean)
    .join("\n");
  return [
    "🌸 *New Order — Ola's Tea | علا شاي*",
    "",
    "*Order:*",
    items,
    "",
    `*Total: ${cartTotal(lines)} SAR*`,
    "",
    "*Customer details:*",
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    `City: ${c.city}`,
    `Address: ${c.address}`,
    c.notes ? `Notes: ${c.notes}` : "",
  ]
    .filter((x, i, a) => !(x === "" && a[i - 1] === ""))
    .join("\n")
    .trim();
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
