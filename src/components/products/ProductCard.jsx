"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import QuickViewProduct from "./QuickViewProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getFinalPrice, isDiscountValid, resolveDiscount } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addItemWishlist, removeItemWishlist, fetchWishlist } from "@/lib/features/userSlice";

const capitalizeWords = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const ProductCard = ({ product }) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);
  const images = product.variants?.[0]?.images || [];

  const inStock = product.variants?.some((variant) =>
    variant.sizes?.some((size) => size.stock > 0),
  );

  const discount = resolveDiscount(product);
  const validDiscount = isDiscountValid(discount) ? discount : null;

  const finalPrice = getFinalPrice(product.price, validDiscount);
  const hasDiscount = Boolean(validDiscount);

  const handleQuickView = (e) => {
    e.stopPropagation();
    setIsQuickView(true);
  };

  const isWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    try {
      if (isWishlist) {
        await dispatch(removeItemWishlist(product._id)).unwrap();
      } else {
        await dispatch(addItemWishlist(product)).unwrap();
      }
    } catch (err) {
      toast.error(err || "Wishlist update failed");
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg border border-gray-200 mb-4 transition-all duration-300 overflow-hidden">
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition"
        >
          <FaHeart
            className={`w-4 h-4 ${
              isWishlist ? "text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {hasDiscount && (
          <div className="absolute top-0 left-0 z-10 bg-red-700 text-white text-xs px-2 py-1">
            {discount.value}
            {discount.type === "percentage" ? "%" : "LE"} OFF
          </div>
        )}

        <Link href={`/products-details/${product._id}`}>
          <div className="relative aspect-3/4 bg-gray-50 overflow-hidden">
            <img
              src={images[0]}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? "opacity-0 scale-105" : "opacity-100"
              }`}
              alt={product.title}
            />

            {images[1] && (
              <img
                src={images[1]}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0 scale-105"
                }`}
                alt={product.title}
              />
            )}
          </div>

          <div className="p-2">
            <h3 className="text-sm uppercase font-semibold line-clamp-2 h-10">
              {capitalizeWords(product.title)}
            </h3>

            <p className="text-[11px] text-gray-500 uppercase">
              {product.brand}
            </p>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-medium text-gray-900">
                EGP {finalPrice.toFixed(2)}
              </span>

              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  EGP {product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="absolute bottom-30 left-2 right-2 flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button
          onClick={handleQuickView}
          className="bg-white px-3 hover:cursor-pointer py-2 rounded shadow hover:bg-gray-100"
        >
          <AiOutlineExclamationCircle size={18} />
        </button>

        <button
          onClick={() => router.push(`/products-details/${product._id}`)}
          disabled={!inStock}
          className={`flex-1 py-2 rounded text-sm flex justify-center gap-2 ${
            inStock
              ? "bg-white hover:cursor-pointer hover:bg-gray-100"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          <FaShoppingCart />
          {inStock ? "Show Details" : "Out of Stock"}
        </button>
      </div>

      <QuickViewProduct
        isOpen={isQuickView}
        onClose={() => setIsQuickView(false)}
        product={product}
      />
    </div>
  );
};

export default ProductCard;
