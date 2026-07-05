"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function usePriceFilter(defaultMin = 0, defaultMax = 8000) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const minPrice = Number(searchParams.get("minPrice")) || defaultMin;
  const maxPrice = Number(searchParams.get("maxPrice")) || defaultMax;

  const handlePrice = (min, max) => {
    const newParams = new URLSearchParams(searchParams);

    if (min !== undefined) newParams.set("minPrice", min);
    else newParams.delete("minPrice");

    if (max !== undefined) newParams.set("maxPrice", max);
    else newParams.delete("maxPrice");

    newParams.set("page", 1);

    router.push(`?${newParams.toString()}`);
  };

  return { minPrice, maxPrice, handlePrice };
}
