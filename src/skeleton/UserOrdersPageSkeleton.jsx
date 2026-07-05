"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserOrdersPageSkeleton() {
  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      {/* LOCATION */}
      <Skeleton height={20} width={160} />

      {/* TABLE */}
      <div className="border mt-4 rounded-xl overflow-hidden bg-white">
        {/* HEADER */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} height={16} />
          ))}
        </div>

        {/* ROWS */}
        {Array.from({ length: 5 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-7 gap-4 p-4 border-b items-center"
          >
            <Skeleton height={15} />
            <Skeleton height={15} />
            <Skeleton height={20} width={80} />
            <Skeleton height={15} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={60} />
            <div className="flex gap-2 justify-center">
              <Skeleton height={32} width={32} />
              <Skeleton height={32} width={32} />
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4">
        <Skeleton height={35} width={80} />
        <Skeleton height={20} width={120} />
        <Skeleton height={35} width={80} />
      </div>
    </div>
  );
}
