import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, image }: { product: Product; image: string }) {
  const { t, add, setOpen } = useStore();
  const [variantId, setVariantId] = useState(product.variants[1]?.id ?? "");
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;

  return (
    <article className="group overflow-hidden rounded-3xl border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={t(product.nameEn, product.nameAr)} loading="lazy" width={1024} height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute start-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs tracking-widest text-primary backdrop-blur">
          {t("PREMIUM", "فاخر")}
        </span>
      </div>
      <div className="space-y-5 p-6 sm:p-8">
        <div>
          <h3 className="text-3xl text-foreground">{t(product.nameEn, product.nameAr)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(product.descEn, product.descAr)}</p>
        </div>
        <fieldset>
          <legend className="eyebrow mb-3">{t("Choose size", "اختر الحجم")}</legend>
          <div className="grid grid-cols-3 gap-2">
            {product.variants.map((v) => (
              <button key={v.id} type="button" onClick={() => setVariantId(v.id)}
                aria-pressed={v.id === variantId}
                className={`rounded-2xl border px-2 py-3 text-center text-xs transition-all ${v.id === variantId ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-gold"}`}>
                <span className="block">{t(v.labelEn, v.labelAr)}</span>
                <span className="mt-1 block font-semibold">{v.price} {t("SAR", "ر.س")}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center rounded-full border bg-background">
            <button aria-label="decrease" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center">{qty}</span>
            <button aria-label="increase" className="p-3" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
          </div>
          <p className="font-display text-3xl text-primary">{variant.price * qty} <span className="text-base">{t("SAR", "ر.س")}</span></p>
        </div>
        <button className="btn-primary w-full" onClick={() => {
          add({ productId: product.id, variantId }, qty);
          toast.success(t("Added to cart", "تمت الإضافة إلى السلة"), { action: { label: t("View", "عرض"), onClick: () => setOpen(true) } });
          setQty(1);
        }}>
          <ShoppingBag className="h-4 w-4" /> {t("Add to Cart", "أضف إلى السلة")}
        </button>
      </div>
    </article>
  );
}
