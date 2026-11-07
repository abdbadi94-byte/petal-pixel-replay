import { createFileRoute } from "@tanstack/react-router";
import { AboutBlock, Features } from "@/components/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — A Little Cup of Nature | Ola's Tea" },
      { name: "description", content: "Ola's Tea is a small brand devoted to natural flower tea and a special tea-drinking experience." },
      { property: "og:title", content: "About Ola's Tea" },
      { property: "og:description", content: "A little cup of nature — the story behind Ola's Tea." },
    ],
  }),
  component: () => (<><AboutBlock /><Features /></>),
});
