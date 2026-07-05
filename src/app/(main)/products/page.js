"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "@/components/products/ProductCard";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductsPageSkeleton from "@/skeleton/ProductsPageSkeleton";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import SearchModal from "@/components/SearchModal";
import useProductsPage from "@/components/products/useProductPage";
import { fetchProducts, fetchAllProductsOptions, setOpenSearch } from "@/lib/features/productsSlice";

import { CiFilter, CiRedo } from "react-icons/ci";
import SortAndLimit from "@/components/products/SortProducts";
import Pagination from "@/components/products/Pagination";
import SearchResultBar from "@/views/SearchResultBar";
import EmptyProducts from "@/views/EmptyProducts";
import Footer from "@/components/Footer";
import FeaturedSection from "@/components/FeaturedSection";

const getGrid = (columns) => {
  const map = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  return map[columns] || "grid-cols-2";
};

export default function ProductsPage() {
  const dispatch = useDispatch();

  const {
    openFilters,
    setOpenFilters,
    searchParams,
    setSearchParams,
    setFilter,
    resetFilters,
    applyFilters,
    applySearch,
  } = useProductsPage();

  const {
    openSearch,
    products,
    loading,
    pagination,
    allProducts,
    error,
  } = useSelector((state) => state.products);

  const [columns, setColumns] = useState(2);
  console.log(allProducts, products);

  useEffect(() => {
    dispatch(fetchAllProductsOptions());
  }, [dispatch]);
  const brands = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.brand).filter(Boolean))];
  }, [allProducts]);

  const materials = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.material).filter(Boolean))];
  }, [allProducts]);

  return (
    <>
      <div className="container mx-auto mt-20 px-4 mb-20">
        {}
        <SearchResultBar
          applySearch={applySearch}
          searchParams={searchParams}
          setFilter={setFilter}
        />

        {}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setOpenFilters(true)}
              className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 hover:cursor-pointer hover:bg-gray-100 text-xs border rounded-sm"
            >
              <CiFilter size={15} />
              Filters
            </button>

            <button
              onClick={resetFilters}
              className="flex px-3 py-1.5 hover:cursor-pointer items-center gap-2 bg-gray-50 text-xs border rounded-sm"
            >
              <CiRedo />
              Reset
            </button>

            <SortAndLimit searchParams={searchParams} setFilter={setFilter} />
          </div>

          {}
          <div className="flex items-center gap-3">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.numberOfPages}
              setFilter={setFilter}
            />

            <ProductsToolbar columns={columns} setColumns={setColumns} />
          </div>
        </div>

        {}
        <SearchModal
          openSearch={openSearch}
          setOpenSearch={(val) => dispatch(setOpenSearch(val))}
          applySearch={applySearch}
          searchParams={searchParams}
          initialValue={searchParams.get("search") || ""}
        />

        <FiltersSidebar
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setFilter={setFilter}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
          brands={brands}
          materials={materials}
          products={products}
        />

        {error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-sm">{error}</p>
            <button onClick={resetFilters} className="mt-4 text-sm underline">Try again</button>
          </div>
        ) : loading ? (
          <ProductsPageSkeleton />
        ) : products.length === 0 ? (
          <EmptyProducts
            hasFilters={searchParams.toString().length > 0}
            onReset={resetFilters}
            onOpenFilters={() => setOpenFilters(true)}
          />
        ) : (
          <div className={`grid gap-4 mt-6 ${getGrid(columns)}`}>
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 bg-gray-100">
        <FeaturedSection />
        <Footer />
      </div>
    </>
  );
}
