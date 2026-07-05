"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion as _motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, X } from "lucide-react";

import { useModalBehavior } from "@/hooks/useModalBeahavior";

import { getFinalPrice, isDiscountValid, resolveDiscount } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/lib/features/cartSlice";

const QuickViewProduct = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const discount = resolveDiscount(product);
  const validDiscount = isDiscountValid(discount) ? discount : null;
  const finalPrice = getFinalPrice(product?.price || 0, validDiscount);
  const hasDiscount = Boolean(validDiscount);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const { overlayRef, handleOverlayClick } = useModalBehavior(isOpen, onClose);

  const variants = product?.variants || [];
  const currentVariant = variants[selectedColorIndex] || {};

  const image = currentVariant?.images?.[0] || "";

  const sizes = currentVariant?.sizes || [];

  const colors = variants.map((v) => ({
    colorCode: v.colorCode,
    color: v.color,
  }));

  const selectedColor = currentVariant?.color;

  const selectedSizeObj = sizes.find((s) => s.size === selectedSize);
  const availableStock = selectedSizeObj?.stock ?? 0;

  const inStock = sizes.some((s) => s.stock > 0);

  const cartItem = useMemo(() => {
    return cart?.items?.find(
      (item) =>
        item?.product?._id === product?._id &&
        item?.color === selectedColor &&
        item?.size === selectedSize,
    );
  }, [cart?.items, product?._id, selectedColor, selectedSize]);

  const cartQty = cartItem?.quantity || 0;

  const getTotal = (extra = 0) => cartQty + qty + extra;

  const increase = () => {
    if (!selectedSize) {
      toast.error("Please select size");
      return;
    }

    const nextTotal = getTotal(1);

    if (nextTotal > availableStock) {
      toast.error(`Only ${availableStock} items available`);
      return;
    }

    if (cartItem) {
      dispatch(updateQuantity({ itemId: cartItem._id, quantity: cartItem.quantity + 1 }))
        .unwrap()
        .catch((err) => toast.error(err || "Error updating quantity"));
    } else {
      setQty((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch(updateQuantity({ itemId: cartItem._id, quantity: cartItem.quantity - 1 }))
          .unwrap()
          .catch((err) => toast.error(err || "Error updating quantity"));
      }
    } else {
      setQty((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSize || !selectedColor) {
        toast.error("Please select size & color");
        return;
      }

      const currentQty = cartItem?.quantity || 0;
      const total = currentQty + qty;

      if (total > availableStock) {
        toast.error(
          `Stock limit is ${availableStock}. You already have ${currentQty} in cart`,
        );
        return;
      }

      setLoadingAdd(true);

      await dispatch(addToCart({
        product,
        options: {
          size: selectedSize,
          color: selectedColor,
          price: finalPrice,
          quantity: qty,
          hasDiscount,
          discount: validDiscount,
        },
      })).unwrap();

      onClose();
    } catch (err) {
      toast.error(err || "Error adding to cart");
    } finally {
      setLoadingAdd(false);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <_motion.div className="bg-white w-[92%] max-w-200 rounded-2xl shadow-2xl overflow-hidden flex relative">
            <button
              onClick={onClose}
              className="absolute  top-3 right-3 hover:bg-gray-100 hover:cursor-pointer p-2 bg-white rounded-full shadow"
            >
              <X size={18} />
            </button>

            <div className="w-[40%] bg-gray-100 flex items-center justify-center p-6">
              <img
                src={image}
                alt={product?.title}
                className="w-full h-87.5 object-contain"
              />
            </div>

            <div className="w-[60%] p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl capitalize ">{product?.title}</h2>

                <p className="text-2xl font-bold mt-2">
                  EGP {finalPrice.toFixed(2)}
                </p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium">Colors</h4>
                  <div className="flex gap-2 mt-2">
                    {colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColorIndex(idx);
                          setSelectedSize(null);
                          setQty(1);
                        }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColorIndex === idx
                            ? "border-black scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: c.colorCode }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium">Size</h4>

                  <div className="flex gap-2 flex-wrap mt-2">
                    {sizes.map((s, i) => {
                      const isOutOfStock = s.stock <= 0;

                      return (
                        <button
                          key={i}
                          disabled={isOutOfStock}
                          onClick={() => {
                            if (isOutOfStock) return;
                            setSelectedSize(s.size);
                            setQty(1);
                          }}
                          className={`relative group px-3 py-1 border rounded-md transition ${
                            selectedSize === s.size
                              ? "bg-black text-white"
                              : "border-gray-300"
                          } ${
                            isOutOfStock
                              ? "cursor-not-allowed opacity-50 line-through"
                              : "cursor-pointer"
                          }`}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium">Qty</h4>

                  <div className="flex items-center border rounded-md w-fit mt-2">
                    <button onClick={decrease} className="px-3">
                      -
                    </button>

                    <span className="px-4">{cartItem ? cartQty : qty}</span>

                    <button onClick={increase} className="px-3">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || !selectedSize || loadingAdd}
                  className="flex-1"
                >
                  {loadingAdd ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )}
                  Add ({qty})
                </Button>

                <Link
                  href={`/products-details/${product?._id}`}
                  className="flex-1 border rounded flex items-center justify-center"
                >
                  Details
                </Link>
              </div>
            </div>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewProduct;
