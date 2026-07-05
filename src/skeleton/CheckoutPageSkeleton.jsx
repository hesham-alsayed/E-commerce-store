import Skeleton from "react-loading-skeleton";

export default function CheckoutSkeleton() {
  return (
    <section className="min-h-screen bg-white p-6 lg:p-10">
      <div className="grid lg:grid-cols-[720px_480px] gap-6">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          {/* Contact */}
          <div>
            <Skeleton height={20} width={120} />
            <Skeleton height={60} className="mt-2" />
          </div>

          {/* Delivery */}
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={120} className="mt-2" />
          </div>

          {/* Payment */}
          <div>
            <Skeleton height={20} width={140} />
            <Skeleton height={80} className="mt-2" />
          </div>

          {/* Address method */}
          <div>
            <Skeleton height={20} width={160} />
            <Skeleton height={60} className="mt-2" />
          </div>

          {/* Button */}
          <Skeleton height={45} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 lg:sticky lg:top-6">
          {/* Title */}
          <Skeleton height={25} width={180} />

          {/* Order items */}
          <Skeleton height={200} />

          {/* subtotal / shipping */}
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={160} />

          {/* coupon */}
          <Skeleton height={40} />

          {/* total */}
          <Skeleton height={50} />
        </div>
      </div>
    </section>
  );
}
