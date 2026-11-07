import { useState } from "react";
import { Minus, Plus, Trash2, X, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { buildWhatsAppMessage, cartTotal, findLine, whatsappUrl, type Customer } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, t, clear } = useStore();
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [c, setC] = useState<Customer>({ name: "", phone: "", city: "", address: "", notes: "" });
  const total = cartTotal(lines);
  const close = () => { setOpen(false); setStep("cart"); };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={close} className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-label="Cart"
        className={`absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-background shadow-soft transition-transform duration-500 ${open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"}`}>
        <header className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-3xl">{step === "cart" ? t("Your Cart", "سلة التسوق") : t("Delivery Details", "بيانات التوصيل")}</h2>
          <button onClick={close} aria-label="close"><X className="h-5 w-5" /></button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center text-muted-foreground">
            <p>{t("Your cart is empty.", "سلتك فارغة.")}</p>
            <a href="/products" onClick={close} className="btn-outline">{t("Browse products", "تصفح المنتجات")}</a>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-6">
              {lines.map((l) => {
                const f = findLine(l);
                if (!f) return null;
                return (
                  <li key={l.variantId} className="rounded-2xl border bg-card p-4">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-medium">{t(f.product.nameEn, f.product.nameAr)}</p>
                        <p className="text-sm text-muted-foreground">{t(f.variant.labelEn, f.variant.labelAr)} · {f.variant.price} {t("SAR", "ر.س")}</p>
                      </div>
                      <button onClick={() => remove(l.variantId)} aria-label="remove" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border">
                        <button className="p-2" aria-label="decrease" onClick={() => setQty(l.variantId, l.qty - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button className="p-2" aria-label="increase" onClick={() => setQty(l.variantId, l.qty + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-semibold text-primary">{f.variant.price * l.qty} {t("SAR", "ر.س")}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="space-y-4 border-t p-6">
              <div className="flex justify-between text-lg"><span>{t("Total", "الإجمالي")}</span><span className="font-display text-3xl text-primary">{total} {t("SAR", "ر.س")}</span></div>
              <button className="btn-primary w-full" onClick={() => setStep("details")}>{t("Checkout", "إتمام الطلب")}</button>
            </footer>
          </>
        ) : (
          <form className="flex flex-1 flex-col" onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappUrl(buildWhatsAppMessage(lines, c)), "_blank");
            clear(); close();
          }}>
            <div className="flex-1 space-y-3 overflow-y-auto p-6">
              <input required className="field" placeholder={t("Full name", "الاسم الكامل")} value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} />
              <input required type="tel" className="field" placeholder={t("Phone number", "رقم الجوال")} value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} />
              <input required className="field" placeholder={t("City", "المدينة")} value={c.city} onChange={(e) => setC({ ...c, city: e.target.value })} />
              <textarea required rows={3} className="field" placeholder={t("Delivery address", "عنوان التوصيل")} value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} />
              <textarea rows={2} className="field" placeholder={t("Notes (optional)", "ملاحظات (اختياري)")} value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} />
            </div>
            <footer className="space-y-3 border-t p-6">
              <div className="flex justify-between"><span>{t("Total", "الإجمالي")}</span><span className="font-semibold text-primary">{total} {t("SAR", "ر.س")}</span></div>
              <button type="submit" className="btn-primary w-full"><MessageCircle className="h-4 w-4" /> {t("Send order via WhatsApp", "إرسال الطلب عبر واتساب")}</button>
              <button type="button" className="w-full text-sm text-muted-foreground underline" onClick={() => setStep("cart")}>{t("Back to cart", "العودة إلى السلة")}</button>
            </footer>
          </form>
        )}
      </aside>
    </div>
  );
}
