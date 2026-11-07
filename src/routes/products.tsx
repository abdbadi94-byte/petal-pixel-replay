import { createFileRoute } from "@tanstack/react-router";
import { ProductsGrid } from "@/components/Sections";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Flower Tea — Loose Leaf & Tea Bags | Ola's Tea" },
      { name: "description", content: "Premium loose leaf flower tea from 25 SAR and tea bags in 6, 15 and 30 packs. Order via WhatsApp." },
      { property: "og:title", content: "Shop Ola's Tea" },
      { property: "og:description", content: "Loose leaf and tea bag flower tea, priced in SAR." },
    ],
  }),
  component: () => <div className="pt-6"><ProductsGrid /></div>,
});
