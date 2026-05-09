import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailPageClient from "@/components/programs/ProgramDetailPageClient";
import { buildMetadata } from "@/lib/metadata";
import { programs } from "@/lib/data";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    return buildMetadata({
      title: "Program",
      description: "Learn more about Aura Rise Foundation programs.",
      path: `/programs/${slug}`,
    });
  }

  return buildMetadata({
    title: program.title,
    description: program.tagline,
    path: `/programs/${program.slug}`,
    image: program.heroImage,
  });
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);

  if (!program) notFound();

  return <ProgramDetailPageClient program={program} />;
}
