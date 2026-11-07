import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import { PHONE_DISPLAY, whatsappUrl } from "@/lib/products";
import { SectionTitle } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ola's Tea — Order on WhatsApp" },
      { name: "description", content: "Reach Ola's Tea on WhatsApp or call 0503267602. We'd love to hear from you." },
      { property: "og:title", content: "Contact Ola's Tea" },
      { property: "og:description", content: "Order or ask a question via WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useStore();
  const [f, setF] = useState({ name: "", email: "", message: "" });
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle eyebrow={t("Contact", "تواصل معنا")} title={t("We'd Love to Hear From You", "يسعدنا تواصلك")} />
      <div className="mt-14 grid gap-8 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          <a href={whatsappUrl(t("Hello Ola's Tea, I'd like to place an order.", "مرحباً علا شاي، أرغب في تقديم طلب."))} target="_blank" rel="noreferrer" className="btn-primary w-full">
            <MessageCircle className="h-4 w-4" /> {t("Order on WhatsApp", "اطلب عبر واتساب")}
          </a>
          <a href={`tel:${PHONE_DISPLAY}`} className="flex items-center gap-4 rounded-3xl border bg-card p-6 shadow-card">
            <Phone className="h-5 w-5 text-sage" /><div><p className="text-xs text-muted-foreground">{t("Phone", "الهاتف")}</p><p dir="ltr" className="text-lg">{PHONE_DISPLAY}</p></div>
          </a>
          <a href="https://www.instagram.com/ola.flowers.tea/" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-3xl border bg-card p-6 shadow-card">
            <Instagram className="h-5 w-5 text-sage" /><div><p className="text-xs text-muted-foreground">Instagram</p><p className="text-lg">@ola.flowers.tea</p></div>
          </a>
        </div>
        <form className="space-y-4 rounded-3xl border bg-card p-8 shadow-card md:col-span-3" onSubmit={(e) => {
          e.preventDefault();
          window.open(whatsappUrl(`Contact form — Ola's Tea\nName: ${f.name}\nEmail: ${f.email}\n\n${f.message}`), "_blank");
        }}>
          <input required className="field" placeholder={t("Your name", "اسمك")} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input required type="email" className="field" placeholder={t("Email", "البريد الإلكتروني")} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <textarea required rows={5} className="field" placeholder={t("Your message", "رسالتك")} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <button className="btn-primary">{t("Send message", "إرسال الرسالة")}</button>
        </form>
      </div>
    </section>
  );
}
