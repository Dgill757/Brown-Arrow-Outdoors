export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-square rounded-md skeleton-shimmer" />
      <div className="mt-4 h-5 rounded skeleton-shimmer" />
      <div className="mt-2 h-4 w-1/2 rounded skeleton-shimmer" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
