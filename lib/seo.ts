import type { Metadata } from 'next';
import { getBaseUrl, toAbsoluteUrl } from '@/lib/site';

const baseUrl = getBaseUrl();

export function buildMetadata({
  title,
  description,
  path,
  image = '/images/hero/hero-buck-head.png',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
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
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
