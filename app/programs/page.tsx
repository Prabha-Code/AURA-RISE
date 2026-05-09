import ProgramsPageClient from "@/components/programs/ProgramsPageClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Programs",
  description:
    "Explore Aura Rise Foundation programs in education, healthcare, nutrition, and empowerment.",
  path: "/programs",
  image: "https://picsum.photos/seed/aura-programs-og/1200/630",
});

export default function ProgramsPage() {
  return <ProgramsPageClient />;
}
