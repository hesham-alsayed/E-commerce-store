import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WishlistSkeleton() {
  return (
    <div className="space-y-4 flex-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton height={80} width={80} />
          <div className="flex-1 space-y-2">
            <Skeleton height={18} width="60%" />
            <Skeleton height={14} width="40%" />
            <Skeleton height={14} width="30%" />
          </div>
          <Skeleton height={36} width={100} />
          <Skeleton circle height={32} width={32} />
        </div>
      ))}
    </div>
  );
}
