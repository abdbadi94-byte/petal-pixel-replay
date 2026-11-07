import { Leaf, Flower2, Sparkles, Coffee } from "lucide-react";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionTitle } from "./SiteChrome";
import { Sprig } from "./Botanical";
import { BAGS_PHOTO, GALLERY_PHOTOS, LOOSE_PHOTO } from "@/lib/photos";
import hero from "@/assets/hero.jpg";
import loose from "@/assets/loose-tea.jpg";
import bags from "@/assets/tea-bags.jpg";
import flowers from "@/assets/dried-flowers.jpg";

export const IMAGES = { hero, loose, bags, flowers };

export function ProductsGrid() {
  const { t } = useStore();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle eyebrow={t("The Collection", "المجموعة")} title={t("Our Premium Teas", "شاينا الفاخر")}
        sub={t("Choose your preferred size — every blend is packed with care.", "اختر الحجم المفضل لديك — كل مزيج يُعبأ بعناية.")} />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <ProductCard product={PRODUCTS[0]!} image={LOOSE_PHOTO || loose} />
        <ProductCard product={PRODUCTS[1]!} image={BAGS_PHOTO || bags} />
      </div>
    </section>
  );
}

export function Features() {
  const { t } = useStore();
  const items = [
    { icon: Leaf, en: "Naturally Caffeine-Free", ar: "خالٍ من الكافيين طبيعياً", den: "Flower blends made without tea leaves (subject to ingredient verification).", dar: "مزيج زهور بدون أوراق الشاي (وفقاً للتحقق من المكونات)." },
    { icon: Flower2, en: "A Beautiful Tea Experience", ar: "تجربة شاي جميلة", den: "Watch the petals bloom and colour your cup.", dar: "شاهد البتلات تتفتح وتلوّن كوبك." },
    { icon: Sparkles, en: "Carefully Selected Ingredients", ar: "مكونات مختارة بعناية", den: "Whole flowers and herbs chosen for colour and aroma.", dar: "زهور وأعشاب كاملة مختارة للونها ورائحتها." },
    { icon: Coffee, en: "Made for Relaxing Moments", ar: "لِلحظات الاسترخاء", den: "A gentle ritual for quiet mornings and calm evenings.", dar: "طقس لطيف لصباحات هادئة وأمسيات مريحة." },
  ];
  return (
    <section className="bg-blush-gradient py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow={t("Why Ola's Tea", "لماذا علا شاي")} title={t("Why Choose Ola's Tea?", "لماذا تختار علا شاي؟")} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, ...i }) => (
            <div key={i.en} className="rounded-3xl border bg-card/80 p-7 text-center shadow-card backdrop-blur transition-transform duration-500 hover:-translate-y-1">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-7 w-7" strokeWidth={1.3} /></div>
              <h3 className="mt-5 text-2xl">{t(i.en, i.ar)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(i.den, i.dar)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const { t } = useStore();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle eyebrow={t("Gallery", "المعرض")} title={t("Moments in Bloom", "لحظات مزهرة")} />
      <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY_PHOTOS.map((src, i) => (
          <figure key={src} className={`group relative overflow-hidden rounded-3xl ${i % 7 === 0 ? "col-span-2 row-span-2" : ""}`}>
            <img src={src} alt={t("Ola's Tea photo", "صورة من علا شاي")} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function AboutBlock() {
  const { t } = useStore();
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
      <Sprig className="pointer-events-none absolute -top-4 end-4 hidden h-48 text-sage/40 md:block" />
      <div className="relative">
        <img src={flowers} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft" />
        <div className="absolute -bottom-6 -start-6 hidden rounded-3xl bg-card p-6 shadow-card sm:block">
          <p className="font-display text-4xl text-primary">100%</p>
          <p className="text-xs text-muted-foreground">{t("Natural flowers & herbs", "زهور وأعشاب طبيعية")}</p>
        </div>
      </div>
      <div>
        <p className="eyebrow">{t("About Us", "من نحن")}</p>
        <h2 className="mt-3 text-5xl">{t("A Little Cup of Nature", "كوب صغير من الطبيعة")}</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          {t("Ola's Tea is a small tea house devoted to natural flower tea. We gather rose buds, chamomile, lavender and fragrant spices into blends that are as lovely to look at as they are to sip.",
            "علا شاي علامة صغيرة مخصصة لشاي الزهور الطبيعية. نجمع براعم الورد والبابونج والخزامى والتوابل العطرية في خلطات جميلة للنظر ولذيذة للتذوق.")}
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("Every pouch is packed by hand, with the hope that each cup becomes a small, special moment in your day.",
            "كل عبوة تُعبأ يدوياً، على أمل أن يصبح كل كوب لحظة صغيرة مميزة في يومك.")}
        </p>
      </div>
    </section>
  );
}
