"use client";

import { motion as m, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import PriceFilter from "./FilterPrice";
import { useModalBehavior } from "@/hooks/useModalBeahavior";
import { XIcon } from "lucide-react";
import { groupSizesByType } from "@/lib/utils";

export default function FiltersSidebar({
  open,
  onClose,
  searchParams,
  setFilter,
  resetFilters,
  applyFilters,
  brands,
  materials,
  products = [],
}) {
  const { handleOverlayClick, overlayRef } = useModalBehavior(open, onClose);

  // ================= QUERY =================
  const brand = searchParams.get("brand") || "all";
  const material = searchParams.get("material") || "all";
  const stock = searchParams.get("stock") || "";

  const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) || [];

  const priceMin = Number(searchParams.get("priceMin") || 0);
  const priceMax = Number(searchParams.get("priceMax") || 5000);

  // ================= TOGGLE =================
  const toggleSize = (size) => {
    const value = String(size);

    const updated = sizes.includes(value)
      ? sizes.filter((s) => s !== value)
      : [...sizes, value];

    setFilter("sizes", updated);
  };

  const toggleStock = (checked) => {
    setFilter("stock", checked ? "in" : "");
  };

  // ================= GROUP SIZES =================
  const groupedSizes = groupSizesByType(products);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <m.div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleOverlayClick}
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* SIDEBAR */}
          <m.div
            className="fixed left-0 top-0 h-full w-95 bg-white z-50 p-5 overflow-y-auto space-y-5"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>

              <button onClick={onClose}>
                <XIcon size={20} />
              </button>
            </div>

            {/* STOCK */}
            <div className="flex justify-between border p-3 rounded-md">
              <Label>In Stock</Label>
              <Switch checked={stock === "in"} onCheckedChange={toggleStock} />
            </div>

            {/* BRAND */}
            <div className="space-y-1">
              <Label>Brand</Label>

              <Select
                value={brand}
                onValueChange={(v) => setFilter("brand", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {brands.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* MATERIAL */}
            <div className="space-y-1">
              <Label>Material</Label>

              <Select
                value={material}
                onValueChange={(v) => setFilter("material", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Materials" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {materials.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SIZES */}
            <div className="space-y-4">
              <Label>Sizes</Label>

              {Object.entries(groupedSizes).map(([type, list]) => (
                <div key={type} className="space-y-2">
                  <p className="text-xs uppercase text-gray-500">{type}</p>

                  <div className="flex flex-wrap gap-2">
                    {list.map((item) => (
                      <Button
                        key={item.size}
                        onClick={() => toggleSize(item.size)}
                        variant={
                          sizes.includes(item.size) ? "default" : "outline"
                        }
                      >
                        {item.size} ({item.stock})
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <PriceFilter
              priceMin={priceMin}
              priceMax={priceMax}
              maxRange={8000}
              setFilter={setFilter}
            />

            {/* ACTIONS */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetFilters}
              >
                Reset
              </Button>

              <Button className="flex-1" onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
