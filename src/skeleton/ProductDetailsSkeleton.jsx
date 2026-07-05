import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailsSkeleton() {
  return (
    <section className="mt-17">
      <div className="max-w-7xl mx-auto bg-white rounded-xl md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {}
          <div className="flex sm:justify-center flex-col-reverse max-sm:flex-row sm:flex-row gap-4">
            {}
            <div className="flex max-sm:flex-col sm:flex-col gap-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} width={80} height={100} />
                ))}
            </div>

            {}
            <Skeleton className="sm:w-[420px] sm:h-[520px] w-full h-[500px] rounded-xl" />
          </div>

          {}
          <div>
            {}
            <Skeleton height={25} width="60%" className="my-3" />

            {}
            <div className="flex gap-3 mb-3">
              <Skeleton width={80} height={20} />
              <Skeleton width={80} height={20} />
              <Skeleton width={50} height={20} />
            </div>

            {}
            <div className="mb-6">
              <Skeleton width={120} height={20} className="mb-2" />
              <div className="flex gap-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} width={80} height={35} />
                  ))}
              </div>
            </div>

            {}
            <div className="mb-6">
              <Skeleton width={100} height={20} className="mb-2" />
              <div className="flex gap-3 flex-wrap">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} width={40} height={40} />
                  ))}
              </div>
            </div>

            {}
            <div className="my-6 flex items-center gap-4">
              <Skeleton width={140} height={40} />
              <Skeleton className="flex-1" height={40} />
            </div>

            {}
            <Skeleton height={40} />

            {}
            <div className="flex gap-4 mt-6 mb-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} width={120} height={30} />
                ))}
            </div>

            {}
            <div className="mt-6 space-y-2">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} height={40} />
                ))}
            </div>

            {}
            <div className="mt-4">
              <Skeleton height={30} width={200} />
            </div>
          </div>
        </div>

        {}
        <div className="pt-10">
          <Skeleton width={200} height={25} className="mb-4" />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={80} className="mb-3" />
            ))}
        </div>
      </div>
    </section>
  );
}
