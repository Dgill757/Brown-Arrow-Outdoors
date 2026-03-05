import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';
import { getBaseUrl } from '@/lib/site';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCT_HANDLES_QUERY } from '@/lib/shopifyQueries';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
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
  ];

  const now = new Date();
  const staticEntries = staticRoutes.map((route) => {
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = route === '' ? 'daily' : 'weekly';
    return {
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency,
      priority: route === '' ? 1 : 0.8,
    };
  });

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = [];
  try {
    const [targets, branded] = await Promise.all([
      shopifyFetch<any>({
        query: COLLECTION_PRODUCT_HANDLES_QUERY,
        variables: { handle: 'targets', first: 100 },
        cacheSeconds: 3600,
        tags: ['sitemap-targets'],
      }),
      shopifyFetch<any>({
        query: COLLECTION_PRODUCT_HANDLES_QUERY,
        variables: { handle: 'branded', first: 100 },
        cacheSeconds: 3600,
        tags: ['sitemap-branded'],
      }),
    ]);

    const handles = new Set<string>();
    targets?.collection?.products?.edges?.forEach((edge: any) => {
      if (edge?.node?.handle) handles.add(edge.node.handle);
    });
    branded?.collection?.products?.edges?.forEach((edge: any) => {
      if (edge?.node?.handle) handles.add(edge.node.handle);
    });

    for (const handle of handles) {
      productEntries.push({
        url: `${baseUrl}/products/${handle}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  } catch {
    // Keep sitemap available with static + blog routes even if Shopify is unavailable.
  }

  return [...staticEntries, ...blogEntries, ...productEntries];
}
