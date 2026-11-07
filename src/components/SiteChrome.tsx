import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Menu, MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/products";
import { Chamomile } from "./Botanical";
import { LOGO } from "@/lib/photos";

const NAV = [
  { to: "/", en: "Home", ar: "الرئيسية" },
  { to: "/our-tea", en: "Our Tea", ar: "شاينا" },
  { to: "/products", en: "Products", ar: "المنتجات" },
  { to: "/about", en: "About Us", ar: "من نحن" },
  { to: "/contact", en: "Contact", ar: "تواصل معنا" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-primary">
      {LOGO ? <img src={LOGO} alt="Ola's Tea logo" className="h-11 w-11 rounded-full object-cover" /> : <Chamomile className="h-8 w-8 text-gold" />}
      <span className="leading-none">
        <span className="block font-display text-2xl">Ola's Tea</span>
        <span className="block font-arabic text-sm text-muted-foreground">علا شاي</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { t, lang, setLang, lines, setOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:underline data-[status=active]:underline-offset-8">
              {t(n.en, n.ar)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="rounded-full border px-3 py-1.5 text-xs tracking-wider hover:border-gold">
            {lang === "en" ? "العربية" : "English"}
          </button>
          <button onClick={() => setOpen(true)} aria-label="cart" className="relative rounded-full p-2 hover:bg-muted">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -end-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{count}</span>}
          </button>
          <button className="p-2 lg:hidden" aria-label="menu" onClick={() => setMenu(!menu)}>{menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {menu && (
        <nav className="flex flex-col border-t px-5 py-3 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="py-3 text-foreground/80 data-[status=active]:text-primary">{t(n.en, n.ar)}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useStore();
  return (
    <footer className="mt-24 border-t bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">{t("Natural Flower Tea — a little cup of nature, beautifully crafted.", "شاي الزهور الطبيعية — كوب صغير من الطبيعة بلمسة فاخرة.")}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">{t("Explore", "تصفح")}</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{t(n.en, n.ar)}</Link></li>)}
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow mb-4">{t("Contact", "تواصل")}</p>
          <a href={`tel:${PHONE_DISPLAY}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> <span dir="ltr">{PHONE_DISPLAY}</span></a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <a href="https://www.instagram.com/ola.flowers.tea/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /> Instagram</a>
        </div>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Ola's Tea · علا شاي</p>
    </footer>
  );
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl text-foreground sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}
