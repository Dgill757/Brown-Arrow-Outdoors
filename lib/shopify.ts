import { getShopifyEnv } from '@/lib/env';

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const { domain, apiVersion, storefrontPublicToken } = getShopifyEnv();

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontPublicToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error(`Shopify request failed with status ${result.status}`);
  }

  const body = await result.json();
  if (body?.errors?.length) {
    throw new Error(body.errors[0]?.message || 'Unknown Shopify GraphQL error');
  }

  return body.data as T;
}
