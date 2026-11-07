import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Features, Gallery, IMAGES } from "@/components/Sections";
import { SectionTitle } from "@/components/SiteChrome";

export const Route = createFileRoute("/our-tea")({
  head: () => ({
    meta: [
      { title: "Our Tea — Flower Blends | Ola's Tea" },
      { name: "description", content: "Meet the rose, chamomile, lavender, cornflower and spices behind Ola's Tea flower blends." },
      { property: "og:title", content: "Our Tea — Ola's Tea" },
      { property: "og:description", content: "The natural flowers and herbs inside every Ola's Tea blend." },
    ],
  }),
  component: OurTea,
});

function OurTea() {
  const { t } = useStore();
  const ings = [
    { en: "Rose", ar: "الورد" }, { en: "Chamomile", ar: "البابونج" }, { en: "Lavender", ar: "الخزامى" },
    { en: "Cornflower", ar: "زهرة الذرة" }, { en: "Hibiscus", ar: "الكركديه" }, { en: "Cinnamon & Star Anise", ar: "القرفة واليانسون النجمي" },
  ];
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <div className="animate-rise">
          <p className="eyebrow">{t("Our Tea", "شاينا")}</p>
          <h1 className="mt-3 text-5xl sm:text-6xl">{t("Petals, Herbs & Gentle Spice", "بتلات وأعشاب وتوابل لطيفة")}</h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t("Each blend begins with whole dried flowers, chosen for their colour and fragrance, then finished with a touch of warm spice.", "يبدأ كل مزيج بزهور مجففة كاملة مختارة للونها وعطرها، ثم يُكمَّل بلمسة من التوابل الدافئة.")}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {ings.map((i) => <li key={i.en} className="rounded-full border bg-card px-4 py-2 text-sm">{t(i.en, i.ar)}</li>)}
          </ul>
          <Link to="/products" className="btn-primary mt-10">{t("Shop the collection", "تسوق المجموعة")}</Link>
        </div>
        <img src={IMAGES.flowers} alt="" className="aspect-square w-full rounded-[3rem] object-cover shadow-soft" />
      </section>
      <section className="bg-cream py-20">
        <SectionTitle eyebrow={t("The Ritual", "الطقوس")} title={t("How to Brew", "طريقة التحضير")} />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 px-5 md:grid-cols-3">
          {[
            [t("Measure", "القياس"), t("One teaspoon of blend or one tea bag per cup.", "ملعقة صغيرة من المزيج أو كيس واحد لكل كوب.")],
            [t("Steep", "النقع"), t("Pour hot water (around 90°C) and wait 5–7 minutes.", "اسكب ماءً ساخناً (حوالي ٩٠ درجة) وانتظر ٥–٧ دقائق.")],
            [t("Enjoy", "استمتع"), t("Add honey if you like, and savour the moment.", "أضف العسل إن رغبت، واستمتع باللحظة.")],
          ].map(([h, p], i) => (
            <li key={i} className="rounded-3xl border bg-card p-8 shadow-card">
              <span className="font-display text-5xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 text-2xl">{h}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p}</p>
            </li>
          ))}
        </ol>
      </section>
      <Features />
      <Gallery />
    </>
  );
}
