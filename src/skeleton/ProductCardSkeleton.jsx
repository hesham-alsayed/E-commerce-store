import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCardSkeleton({ className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {}
        <div className="relative h-100 bg-gray-50 flex items-center justify-center overflow-hidden">
          <Skeleton height="100%" width="100%" />
        </div>

        {}
        <div className="p-2">
          {}
          <div className="h-10 mb-2">
            <Skeleton height={16} width="85%" />
            <Skeleton height={14} width="60%" />
          </div>

          {}
          <Skeleton height={12} width="70%" className="mb-2" />

          {}
          <div className="flex items-center justify-between mt-1">
            <Skeleton height={16} width="50px" />
            <Skeleton height={14} width="60px" />
          </div>
        </div>
      </div>
    </div>
  );
}
