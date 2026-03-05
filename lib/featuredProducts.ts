type ShopifyProduct = {
  id?: string;
  handle?: string;
  featuredImage?: { url?: string | null } | null;
  images?: { edges?: Array<{ node?: { url?: string | null } | null }> } | null;
};

function getImageUrl(product: ShopifyProduct) {
  return product?.featuredImage?.url || product?.images?.edges?.[0]?.node?.url || '';
}

export function pickFeaturedProducts(products: ShopifyProduct[], limit: number) {
  const byHandle = new Set<string>();
  const byImage = new Set<string>();
  const selected: ShopifyProduct[] = [];
  const fallback: ShopifyProduct[] = [];

  for (const product of products) {
    const handle = product?.handle || '';
    const imageUrl = getImageUrl(product);

    if (handle && byHandle.has(handle)) {
      continue;
    }

    if (imageUrl && byImage.has(imageUrl)) {
      fallback.push(product);
      continue;
    }

    if (handle) byHandle.add(handle);
    if (imageUrl) byImage.add(imageUrl);
    selected.push(product);

    if (selected.length >= limit) {
      return selected;
    }
  }

  for (const product of fallback) {
    const handle = product?.handle || '';
    if (handle && byHandle.has(handle)) continue;
    if (handle) byHandle.add(handle);
    selected.push(product);
    if (selected.length >= limit) break;
  }

  return selected;
}

