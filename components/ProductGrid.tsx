import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
  const dedupedProducts = products.filter((product, index, all) => {
    const key = product?.handle || product?.id || `idx-${index}`;
    return all.findIndex((candidate) => (candidate?.handle || candidate?.id || '') === key) === index;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {dedupedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
