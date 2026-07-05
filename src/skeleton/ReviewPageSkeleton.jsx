import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ReviewsPageSkeleton() {
  return (
    <div className="space-y-4">
      {/* Route */}
      <div className="mt-4">
        <Skeleton height={16} width={150} />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Skeleton height={26} width={200} />
        <Skeleton height={14} width={300} />
      </div>

      {/* GRID مثل الصفحة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-4 flex gap-4">
            {/* IMAGE */}
            <div className="w-28 shrink-0">
              <Skeleton height={120} borderRadius={8} />
              <Skeleton height={14} width="80%" className="mt-2" />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* STARS + ACTIONS */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} circle width={14} height={14} />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={20} height={20} />
                  </div>
                </div>

                {/* COMMENT */}
                <div className="space-y-2 mt-2">
                  <Skeleton height={12} />
                  <Skeleton height={12} width="90%" />
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-3 pt-2 border-t">
                <Skeleton height={10} width={120} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPageSkeleton;
