import HomePageClient from "@/components/pages/HomePageClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Aura Rise Foundation supports children through education, nutrition, healthcare, and empowerment.",
  path: "/",
  image: "https://picsum.photos/seed/aura-home-og/1200/630",
});

export default function HomePage() {
  return <HomePageClient />;
}
