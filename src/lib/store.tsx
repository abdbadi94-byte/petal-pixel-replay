import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartLine } from "./products";

export type Lang = "en" | "ar";

type Store = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, ar: string) => string;
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (variantId: string, qty: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem("ola-lang");
      if (l === "ar" || l === "en") setLang(l);
      const c = localStorage.getItem("ola-cart");
      if (c) setLines(JSON.parse(c));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (ready) localStorage.setItem("ola-lang", lang);
  }, [lang, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("ola-cart", JSON.stringify(lines));
  }, [lines, ready]);

  const value: Store = {
    lang,
    setLang,
    t: (en, ar) => (lang === "ar" ? ar : en),
    lines,
    add: (line, qty = 1) =>
      setLines((prev) => {
        const ex = prev.find((l) => l.variantId === line.variantId);
        if (ex) return prev.map((l) => (l.variantId === line.variantId ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { ...line, qty }];
      }),
    setQty: (variantId, qty) =>
      setLines((prev) => (qty <= 0 ? prev.filter((l) => l.variantId !== variantId) : prev.map((l) => (l.variantId === variantId ? { ...l, qty } : l)))),
    remove: (variantId) => setLines((prev) => prev.filter((l) => l.variantId !== variantId)),
    clear: () => setLines([]),
    open,
    setOpen,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
