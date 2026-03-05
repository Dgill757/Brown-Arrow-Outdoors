import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
  const uniqueProducts = products.filter((product, index, all) => {
    const imageUrl = product?.featuredImage?.url || product?.images?.edges?.[0]?.node?.url || '';
    if (!imageUrl) return true;
    return all.findIndex((candidate) => {
      const candidateImage = candidate?.featuredImage?.url || candidate?.images?.edges?.[0]?.node?.url || '';
      return candidateImage === imageUrl;
    }) === index;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {uniqueProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
