import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardPageSkeleton() {
  return (
    <div className="min-h-screen mb-3">
      {/* ROUTE */}
      <div className="max-w-6xl mx-auto mb-6">
        <Skeleton height={20} width={200} />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* PROFILE SECTION */}
        <div className="bg-white rounded-2xl p-6 shadow flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Skeleton circle width={112} height={112} />

          <div className="flex-1 space-y-3">
            <Skeleton height={25} width={200} />
            <Skeleton height={15} width={300} />
            <Skeleton height={15} width={150} />

            <div className="flex gap-3 mt-4">
              <Skeleton width={100} height={35} />
              <Skeleton width={100} height={35} />
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow flex gap-4 items-center">
              <Skeleton circle width={50} height={50} />
              <div className="space-y-2">
                <Skeleton width={120} height={12} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
          ))}
        </div>

        {/* CURRENT ORDERS */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <Skeleton width={180} height={20} />

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center border-b pb-3">
              <div className="space-y-2">
                <Skeleton width={150} height={15} />
                <Skeleton width={120} height={12} />
              </div>

              <Skeleton width={90} height={25} borderRadius={20} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}