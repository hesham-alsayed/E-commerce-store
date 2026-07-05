import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-4">
      {}
      <div className="w-12 h-18">
        <Skeleton height="100%" />
      </div>

      {}
      <div className="flex flex-col flex-1 gap-2">
        <Skeleton width={150} height={10} />
        <Skeleton width={100} height={8} />

        <div className="flex gap-2 mt-2">
          <Skeleton width={30} height={25} />
          <Skeleton width={30} height={25} />
          <Skeleton width={30} height={25} />
        </div>
      </div>

      {}
      <div className="flex flex-col items-end gap-3">
        <Skeleton width={60} height={10} />
        <Skeleton width={30} height={30} />
      </div>
    </div>
  );
}