import type { Metadata } from "next";

const siteName = "Aura Rise Foundation";
const baseUrl = "https://aurarisefoundation.org";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/opengraph-image.png",
}: MetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
