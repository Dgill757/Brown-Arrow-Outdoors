export function normalizeShopifyImage(url: string) {
  if (!url) return url;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

