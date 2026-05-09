import DonatePageClient from "@/components/pages/DonatePageClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Donate",
  description:
    "Support Aura Rise Foundation with a one-time or monthly gift for education, nutrition, healthcare, and empowerment.",
  path: "/donate",
  image: "https://picsum.photos/seed/aura-donate-og/1200/630",
});

export default function DonatePage() {
  return <DonatePageClient />;
}
