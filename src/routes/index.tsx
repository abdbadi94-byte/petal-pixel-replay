import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { AboutBlock, Features, Gallery, IMAGES, ProductsGrid } from "@/components/Sections";
import { Chamomile, Divider, Sprig } from "@/components/Botanical";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ola's Tea | علا شاي — Natural Flower Tea" },
      { name: "description", content: "Premium natural flower tea from Ola's Tea. Loose leaf and tea bags, ordered easily via WhatsApp." },
      { property: "og:title", content: "Ola's Tea | Natural Flower Tea" },
      { property: "og:description", content: "Discover the beauty of natural flower tea — loose leaf and tea bags in SAR." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useStore();
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <Sprig className="animate-floaty pointer-events-none absolute -start-6 top-10 h-64 text-sage/40" />
        <Chamomile className="animate-floaty pointer-events-none absolute end-10 top-6 h-16 text-gold/50" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div className="animate-rise relative z-10">
            <p className="eyebrow">{t("Natural Flower Tea", "شاي الزهور الطبيعية")}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              {t("Discover the Beauty of Natural Tea", "اكتشف جمال الشاي الطبيعي")}
            </h1>
            <p className="mt-3 font-arabic text-2xl text-primary/80">{t("اكتشف جمال الشاي الطبيعي", "Discover the Beauty of Natural Tea")}</p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t("Hand-blended petals, herbs and gentle spices — a moment of colour and calm in every cup.",
                "بتلات وأعشاب وتوابل لطيفة ممزوجة يدوياً — لحظة من الألوان والهدوء في كل كوب.")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">{t("Shop Now", "تسوق الآن")}</Link>
              <Link to="/our-tea" className="btn-outline">{t("Discover Our Tea", "اكتشف شاينا")}</Link>
            </div>
          </div>
          <div className="animate-rise relative [animation-delay:.2s]">
            <div className="overflow-hidden rounded-[3rem] shadow-soft">
              <img src={IMAGES.hero} alt={t("Brass teapot with flower tea", "إبريق نحاسي مع شاي الزهور")} width={1600} height={1104} className="aspect-[4/3.4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 end-6 rounded-2xl bg-card px-5 py-4 shadow-card">
              <p className="text-xs text-muted-foreground">{t("Starting from", "ابتداءً من")}</p>
              <p className="font-display text-3xl text-primary">25 {t("SAR", "ر.س")}</p>
            </div>
          </div>
        </div>
      </section>
      <Divider className="mt-16" />
      <ProductsGrid />
      <Features />
      <AboutBlock />
      <Gallery />
    </>
  );
}
