import type { Metadata } from 'next';

const baseUrl = 'https://brokenarrowoutdoors.com';

export function buildMetadata({
  title,
  description,
  path,
  image = '/images/hero/hero-1.png',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Broken Arrow Outdoors',
      type: 'website',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
