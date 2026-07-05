import Skeleton from "react-loading-skeleton";

export default function CartPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        {/* TITLE */}
        <Skeleton height={30} width={200} className="mb-5" />

        {/* CART ITEMS */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-4 items-center border p-4 rounded-lg"
          >
            {/* IMAGE */}
            <Skeleton width={96} height={96} />

            {/* INFO */}
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" height={15} />
              <Skeleton width="40%" height={12} />
              <Skeleton width="30%" height={15} />
            </div>

            {/* QTY */}
            <Skeleton width={90} height={35} />

            {/* REMOVE */}
            <Skeleton circle width={20} height={20} />
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-4">
        <div className="border p-4 rounded-lg space-y-4">
          {/* DISCOUNT */}
          <Skeleton height={40} />

          {/* ORDER NOTE */}
          <Skeleton height={80} />

          {/* TOTAL */}
          <div className="flex justify-between">
            <Skeleton width={80} height={20} />
            <Skeleton width={80} height={20} />
          </div>

          {/* BUTTON */}
          <Skeleton height={45} />

          {/* LINK */}
          <Skeleton width="60%" height={15} />
        </div>
      </div>
    </div>
  );
}
