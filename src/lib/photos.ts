// Brand photos supplied by Ola's Tea (CDN assets).
const mods = import.meta.glob<{ url: string }>("@/assets/photos/*.asset.json", { eager: true, import: "default" });
const byN = (n: number) => mods[`/src/assets/photos/p${n}.jpg.asset.json`]?.url ?? "";

export const LOGO = byN(15);
export const LOOSE_PHOTO = byN(18);
export const BAGS_PHOTO = byN(4);
export const GALLERY_PHOTOS = [18, 3, 9, 16, 11, 1, 13, 10, 17, 8, 2, 14, 5, 6, 4].map(byN);
