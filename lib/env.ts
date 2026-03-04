import 'server-only';

type ShopifyEnv = {
  domain: string;
  apiVersion: string;
  storefrontPublicToken: string;
};

function readRequiredEnv(name: 'SHOPIFY_DOMAIN' | 'SHOPIFY_API_VERSION' | 'STOREFRONT_PUBLIC_TOKEN'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required Shopify environment variable: ${name}`);
  }
  return value;
}

export function getShopifyEnv(): ShopifyEnv {
  return {
    domain: readRequiredEnv('SHOPIFY_DOMAIN'),
    apiVersion: readRequiredEnv('SHOPIFY_API_VERSION'),
    storefrontPublicToken: readRequiredEnv('STOREFRONT_PUBLIC_TOKEN'),
  };
}
