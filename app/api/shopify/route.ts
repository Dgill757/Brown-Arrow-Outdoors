import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body?.query;
    const variables = body?.variables;

    if (typeof query !== 'string' || query.length === 0) {
      return NextResponse.json({ error: 'Invalid Shopify query payload.' }, { status: 400 });
    }

    const data = await shopifyFetch<Record<string, unknown>>({
      query,
      variables,
      cacheSeconds: query.includes('mutation') || query.includes('cart(') ? 0 : 60,
      tags: ['shopify-api'],
    });

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Shopify proxy error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
