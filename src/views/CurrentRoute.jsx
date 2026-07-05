"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMapPin, FiChevronRight } from "react-icons/fi";

export default function CurrentRoute() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");

    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <div className="flex mb-10 items-center gap-2 text-sm text-gray-500">
      <FiMapPin className="text-gray-500" />

      <Link
        href="/"
        className={`hover:text-black ${
          breadcrumbs.length === 0 ? "font-semibold text-black" : ""
        }`}
      >
        Home
      </Link>

      {breadcrumbs.map((item) => (
        <div key={item.path} className="flex items-center gap-2">
          <FiChevronRight className="text-gray-400" />

          {item.isLast ? (
            <span className="font-semibold text-black">{item.label}</span>
          ) : (
            <Link href={item.path} className="hover:text-black">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
