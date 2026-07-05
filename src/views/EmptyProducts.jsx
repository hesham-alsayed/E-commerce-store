import { CiSearch, CiBoxList } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export default function EmptyProducts({
  hasFilters,
  onReset,
  onOpenFilters,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* ICON */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-4">
        {hasFilters ? (
          <CiSearch size={36} className="text-gray-500" />
        ) : (
          <CiBoxList size={36} className="text-gray-500" />
        )}
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-2">
        {hasFilters ? "No results found" : "No products available"}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 max-w-md mb-6">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "There are no products in this section yet. Please check back later."}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3 flex-wrap justify-center">
        {hasFilters && (
          <Button variant="outline" onClick={onReset}>
            Reset Filters
          </Button>
        )}

        <Button onClick={onOpenFilters}>
          Browse Filters
        </Button>
      </div>
    </div>
  );
}