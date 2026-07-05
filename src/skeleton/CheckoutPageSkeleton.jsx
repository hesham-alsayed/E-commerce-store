import Skeleton from "react-loading-skeleton";

export default function CheckoutSkeleton() {
  return (
    <section className="min-h-screen bg-white p-6 lg:p-10">
      <div className="grid lg:grid-cols-[720px_480px] gap-6">
        {}
        <div className="space-y-8">
          {}
          <div>
            <Skeleton height={20} width={120} />
            <Skeleton height={60} className="mt-2" />
          </div>

          {}
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={120} className="mt-2" />
          </div>

          {}
          <div>
            <Skeleton height={20} width={140} />
            <Skeleton height={80} className="mt-2" />
          </div>

          {}
          <div>
            <Skeleton height={20} width={160} />
            <Skeleton height={60} className="mt-2" />
          </div>

          {}
          <Skeleton height={45} />
        </div>

        {}
        <div className="space-y-4 lg:sticky lg:top-6">
          {}
          <Skeleton height={25} width={180} />

          {}
          <Skeleton height={200} />

          {}
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={160} />

          {}
          <Skeleton height={40} />

          {}
          <Skeleton height={50} />
        </div>
      </div>
    </section>
  );
}
