"use client";

import WishlistItem from "@/components/profile/wishlist/WishlistItem";
import WishlistPagination from "@/components/profile/wishlist/WishlistPagination";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeItemWishlist } from "@/lib/features/userSlice";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CurrentRoute from "@/views/CurrentRoute";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const rowsPerPage = 3;

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const safeWishlist = wishlist || [];

  const totalPages = Math.ceil(safeWishlist.length / rowsPerPage);

  const paginated = safeWishlist.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const addToCart = (item) => {
    if (item.stockStatus !== "Out of stock") {
      console.log("Added:", item);
    }
  };

  const hasData = safeWishlist.length > 0;

  return (
    <div className="min-h-[70vh] flex flex-col">
      <CurrentRoute />
      {!hasData ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6">
          {}
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart className="w-7 h-7 text-gray-400" />
          </div>

          {}
          <p className="text-gray-500 text-sm">No items found</p>

          {}
          <span className="text-xs text-gray-400 mt-2">
            Start adding items to your wishlist
          </span>
          <Button
            onClick={() => router.push("/products")}
            className="mt-5 hover:cursor-pointer"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          {}
          <div className="space-y-4 flex-1">
            {paginated.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                onRemove={() => dispatch(removeItemWishlist(item?._id || item.id))}
                onAdd={addToCart}
              />
            ))}
          </div>

          {}
          {totalPages > 1 && (
            <div className="mt-6">
              <WishlistPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNext={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
