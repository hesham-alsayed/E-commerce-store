"use client";

import { useEffect, useCallback, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/productsSlice";

export default function useProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const collectionId = searchParams.get("collection");
  const categoryId = searchParams.get("category");
  const subCategoryId = searchParams.get("subcategory");

  const [openFilters, setOpenFilters] = useState(false);

  const buildQuery = useCallback(() => {
    const url = Object.fromEntries([...searchParams]);

    return {
      collection: collectionId,
      category: categoryId,
      subcategory: subCategoryId,

      search: url.search ?? "",
      brand: url.brand || undefined,
      material: url.material || undefined,
      stock: url.stock || undefined,

      sizes: url.sizes || undefined,

      priceMin: url.priceMin ? Number(url.priceMin) : undefined,
      priceMax: url.priceMax ? Number(url.priceMax) : undefined,

      sort: url.sort || undefined,
      limit: url.limit ? Number(url.limit) : 12,
      page: url.page ? Number(url.page) : 1,
    };
  }, [searchParams, collectionId, categoryId, subCategoryId]);

  useEffect(() => {
    dispatch(fetchProducts(buildQuery()));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(buildQuery()));
  }, [collectionId, categoryId, subCategoryId]);

  const setFilter = (key, value, options = {}) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value.length === 0) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key !== "page") {
      params.set("page", 1);
    }

    router.push(`?${params.toString()}`);

    if (options.fetch) {
      dispatch(fetchProducts({
        ...buildQuery(),
        [key]: value,
        page: key === "page" ? value : 1,
      }));
    }
  };

  const applyFilters = () => {
    dispatch(fetchProducts(buildQuery()));
    setOpenFilters(false);
  };

  const applySearch = (value) => {
    const params = new URLSearchParams(searchParams);
    const trimmed = value?.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    params.set("page", 1);
    router.push(`?${params.toString()}`);

    dispatch(fetchProducts({
      ...buildQuery(),
      search: trimmed ?? "",
      page: 1,
    }));
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set("page", 1);

    router.push(`?${params.toString()}`);

    dispatch(fetchProducts({
      collection: collectionId,
      category: categoryId,
      subcategory: subCategoryId,
      page: 1,
      limit: 12,
    }));
  };

  return {
    products,
    loading,

    openFilters,
    setOpenFilters,

    resetFilters,
    searchParams,
    setFilter,
    applyFilters,
    applySearch,
  };
}
