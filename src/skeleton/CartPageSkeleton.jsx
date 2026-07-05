import Skeleton from "react-loading-skeleton";

export default function CartPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {}
      <div className="lg:col-span-2 space-y-6">
        {}
        <Skeleton height={30} width={200} className="mb-5" />

        {}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-4 items-center border p-4 rounded-lg"
          >
            {}
            <Skeleton width={96} height={96} />

            {}
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" height={15} />
              <Skeleton width="40%" height={12} />
              <Skeleton width="30%" height={15} />
            </div>

            {}
            <Skeleton width={90} height={35} />

            {}
            <Skeleton circle width={20} height={20} />
          </div>
        ))}
      </div>

      {}
      <div className="space-y-4">
        <div className="border p-4 rounded-lg space-y-4">
          {}
          <Skeleton height={40} />

          {}
          <Skeleton height={80} />

          {}
          <div className="flex justify-between">
            <Skeleton width={80} height={20} />
            <Skeleton width={80} height={20} />
          </div>

          {}
          <Skeleton height={45} />

          {}
          <Skeleton width="60%" height={15} />
        </div>
      </div>
    </div>
  );
}
