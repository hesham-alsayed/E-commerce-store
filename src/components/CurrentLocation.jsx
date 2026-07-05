"use client";

import { usePathname } from "next/navigation";

export default function CurrentLocation() {
  const pathname = usePathname();
  const pathParts = pathname === "/" ? ["Home"] : pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md my-4">
      <span className="text-gray-400">&lt;</span>

      <span className="font-semibold">{pathParts[0]}</span>

      {pathParts.slice(1).map((part, idx) => (
        <span key={idx} className="capitalize">
          {" > "}{part}
        </span>
      ))}

      <span className="ml-auto  text-[20px] font-bold">{pathParts[pathParts.length - 1]}</span>
    </div>
  );
}
