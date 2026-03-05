import { NextResponse } from 'next/server';
import { fetchShopifyRecommendations } from '@/lib/shopify';

export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const limit = Number(searchParams.get('limit') || '4');

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId query parameter.' }, { status: 400 });
    }

    const recommendations = await fetchShopifyRecommendations(productId, limit);
    return NextResponse.json({ products: recommendations });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown recommendations error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
