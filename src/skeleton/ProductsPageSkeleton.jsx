import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsPageSkeleton({ columns = 4 }) {
  const skeletonCount = columns * 2; // عدد مناسب للشاشة

  const gridClasses = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "md:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "2xl:grid-cols-5",
  };

  return (
    <>
      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 p-4">
        <div className="flex items-center gap-3">
          <Skeleton height={40} width={120} />
          <Skeleton height={36} width={100} />
        </div>
        <Skeleton height={40} width={150} />
      </div>

      {/* Products Grid Skeleton */}
      <div className={`grid ${gridClasses[columns]} gap-4`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    </>
  );
}
