import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderConfirmationSkeleton() {
  return (
    <div className="max-w-200 mx-auto my-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Skeleton width={120} height={40} />
      </div>

      {/* Title */}
      <Skeleton width={220} height={28} />
      <div className="mt-2">
        <Skeleton width={160} height={18} />
      </div>

      <div className="mt-6">
        <Skeleton width={"100%"} height={14} count={2} />
      </div>

      {/* Order Info Row */}
      <div className="flex justify-between border-t border-b border-gray-200 py-4 my-6 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex-1 text-center space-y-2">
              <Skeleton width={80} height={12} />
              <Skeleton width={60} height={12} />
            </div>
          ))}
      </div>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton width={64} height={64} />

              <div className="flex-1 space-y-2">
                <Skeleton width={"60%"} height={14} />
                <Skeleton width={"40%"} height={12} />
              </div>

              <div className="text-right space-y-2">
                <Skeleton width={50} height={12} />
                <Skeleton width={60} height={12} />
              </div>
            </div>
          ))}
      </div>

      {/* Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <Skeleton width={80} />
          <Skeleton width={60} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={80} />
          <Skeleton width={60} />
        </div>

        <div className="flex justify-between">
          <Skeleton width={80} />
          <Skeleton width={60} />
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between border-t pt-4">
        <Skeleton width={100} height={18} />
        <Skeleton width={80} height={18} />
      </div>

      {/* Footer text */}
      <div className="mt-6 space-y-2">
        <Skeleton width={"100%"} height={12} count={2} />
        <Skeleton width={180} height={14} />
      </div>
    </div>
  );
}