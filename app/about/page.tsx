import AboutPageClient from "@/components/pages/AboutPageClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Meet the team, explore our story, and see how Aura Rise Foundation turns care into measurable impact.",
  path: "/about",
  image: "https://picsum.photos/seed/aura-about-og/1200/630",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
