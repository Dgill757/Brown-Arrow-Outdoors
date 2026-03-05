import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';

const BASE_URL = 'https://brokenarrowoutdoors.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/targets',
    '/branded',
    '/our-story',
    '/gallery',
    '/blog',
    '/partnerships',
    '/testimonials',
    '/contact',
    '/cart',
  ];

  const now = new Date();
  const staticEntries = staticRoutes.map((route) => {
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = route === '' ? 'daily' : 'weekly';
    return {
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency,
      priority: route === '' ? 1 : 0.8,
    };
  });

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
