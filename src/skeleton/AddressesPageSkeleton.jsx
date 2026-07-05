import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AddressesPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton height={25} width={200} />
          <Skeleton height={15} width={300} />
        </div>

        <Skeleton height={40} width={140} />
      </div>

      {}
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg space-y-4">
            {}
            <Skeleton height={20} width={180} />

            {}
            <Skeleton height={15} width={120} />

            {}
            <div className="space-y-3">
              <Skeleton height={14} />
              <Skeleton height={14} width="90%" />
              <Skeleton height={14} width="80%" />
            </div>

            {}
            <div className="flex justify-between pt-4 border-t">
              <Skeleton height={30} width={100} />

              <div className="flex gap-2">
                <Skeleton circle height={32} width={32} />
                <Skeleton circle height={32} width={32} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
