"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { FiRotateCcw, FiTruck } from "react-icons/fi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";

import { Button } from "@/components/ui/button";

import ShareProduct from "../ShareProduct";
import { getFinalPrice, resolveDiscount } from "@/lib/utils";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import Badge from "../Badge";
import Accordion from "../cart/Accordian";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/lib/features/cartSlice";

export default function ProductInfo({
  product,
  selectedColor,
  selectedSize,
  quantity,
  setQuantity,
  setSelectedSize,
  handleColorChange,
  currentVariant,
}) {
  const discount = resolveDiscount(product);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const hasDiscount = Boolean(discount);
  const finalPrice = getFinalPrice(product.price, discount);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const discountPercent =
    hasDiscount && discount.type === "percentage" ? discount.value : null;

  const discountFixed =
    hasDiscount && discount.type === "fixed" ? discount.value : null;

  const totalStock = useMemo(() => {
    return product?.variants?.reduce((acc, v) => {
      return (
        acc + (v.sizes?.reduce((sAcc, s) => sAcc + (s.stock || 0), 0) || 0)
      );
    }, 0);
  }, [product]);

  const cartItem = cart.items?.find(
    (item) =>
      (item?.productId === product?._id ||
        item?.product?._id === product?._id) &&
      item?.size === selectedSize &&
      item?.color === selectedColor,
  );
  const displayQty = cartItem ? cartItem.quantity : quantity;

  const sizes = currentVariant?.sizes || [];

  const selectedSizeObj = sizes.find((s) => s.size === selectedSize);
  const availableStock = selectedSizeObj?.stock ?? 0;

  const increase = () => {
    if (!selectedSize) return;

    const currentQty = cartItem ? cartItem.quantity : quantity;

    const next = currentQty + 1;

    if (next > availableStock) {
      toast.error(`Only ${availableStock} items available`);
      return;
    }

    if (cartItem) {
      dispatch(updateQuantity({ itemId: cartItem._id, quantity: next }))
        .unwrap()
        .catch((err) => toast.error(err || "Error updating quantity"));
    } else {
      setQuantity((p) => {
        if (p + (cartItem?.quantity || 0) + 1 > availableStock) {
          toast.error(`Only ${availableStock} items available`);
          return p;
        }
        return p + 1;
      });
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
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size & color");
      return;
    }

    const currentQty = cartItem?.quantity || 0;
    const total = currentQty + quantity;

    if (total > availableStock) {
      toast.error(
        `Stock limit is ${availableStock}. You already have ${currentQty} in cart`,
      );
      return;
    }

    setLoadingAdd(true);

    try {
      await dispatch(addToCart({
        product,
        options: {
          size: selectedSize,
          color: selectedColor,
          price: finalPrice,
          quantity,
        },
      })).unwrap();
    } catch (err) {
      toast.error(err || "Error adding to cart");
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size & color");
      return;
    }
    console.log(cartItem);

    try {
      setLoadingBuy(true);

      if (cartItem) {
        router.push("/checkout");
        return;
      }

      if (quantity > availableStock) {
        toast.error(`Only ${availableStock} items available`);
        return;
      }

      await dispatch(addToCart({
        product,
        options: {
          size: selectedSize,
          color: selectedColor,
          price: finalPrice,
          quantity,
        },
      })).unwrap();

      router.push("/checkout");
    } catch (err) {
      toast.error(err || "Checkout failed");
    } finally {
      setLoadingBuy(false);
    }
  };
  return (
    <div>
      <h1 className="text-[24px] font-semibold capitalize my-3">
        {product.title}
      </h1>

      <p className="text-xs text-gray-500 mb-2">Total Stock: {totalStock}</p>

      <div className="flex items-center gap-3 mb-2 relative">
        <span className="text-[28px] text-red-700">
          LE {finalPrice.toFixed(2)} EGP
        </span>

        {hasDiscount && (
          <span className="line-through text-gray-400 text-[16px]">
            LE {product.price} EGP
          </span>
        )}
      </div>

      {hasDiscount && (
        <span className="bg-gray-100 text-black font-bold text-[12px] px-4 py-1.5 rounded-full z-10">
          {discount.type === "percentage"
            ? `${discountPercent}% OFF`
            : `-LE ${discountFixed}`}
        </span>
      )}

      <div className="mb-6 mt-6">
        <p className="mb-2 font-medium">Color: {selectedColor}</p>

        <div className="flex gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => handleColorChange(variant.color)}
              className={`capitalize text-xs rounded-sm w-15 h-6 cursor-pointer border transition ${
                selectedColor === variant.color
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {variant.color}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 font-medium">Size: {selectedSize}</p>

        <div className="flex gap-3 flex-wrap">
          {currentVariant?.sizes?.map((s) => {
            const isOutOfStock = s.stock === 0;

            return (
              <button
                key={s.size}
                disabled={isOutOfStock}
                onClick={() => {
                  if (isOutOfStock) return;

                  setSelectedSize(s.size);
                  setQuantity(1);
                }}
                className={`relative group capitalize text-xs rounded-sm w-15 h-6 border transition ${
                  selectedSize === s.size
                    ? "bg-black text-white"
                    : "text-black bg-white"
                } ${
                  isOutOfStock
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer hover:border-gray-400"
                }`}
              >
                <span className={isOutOfStock ? "line-through" : ""}>
                  {s.size}
                </span>

                <span className="absolute -top-2 -right-2 text-[10px] bg-gray-200 text-black px-1 rounded">
                  {s.stock}
                </span>

                {isOutOfStock && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                    Out of stock
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border rounded px-3 py-1">
          <button onClick={decrease} className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors">
            <FaMinus size={10} />
          </button>

          <span className="px-4">{displayQty}</span>

          <button onClick={increase} className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors">
            <FaPlus size={10} />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize || loadingAdd || !selectedColor}
          className="px-20 flex py-4 items-center justify-center gap-2 
          hover:opacity-80 cursor-pointer transition
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingAdd ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add To Cart ({displayQty})
            </>
          )}
        </Button>
      </div>

      <Button
        onClick={handleBuyNow}
        disabled={!selectedSize || !selectedColor || loadingBuy}
        className="w-full bg-black text-white hover:opacity-80 cursor-pointer transition"
      >
        {loadingBuy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </>
        ) : cartItem ? (
          "Go To Checkout"
        ) : (
          "Buy It Now"
        )}
      </Button>

      <div className="flex gap-4 mt-6 mb-4 items-center">
        <Badge icon={<GiAirplaneDeparture />} text="FAST SHIPPING" />
        <Badge icon={<BsHeadset />} text="24/7 SUPPORT" />
        <Badge icon={<AiOutlineReload />} text="14 DAYS RETURN" />
      </div>

      <div className="mt-6">
        <Accordion title="Shipping & Returns" icon={FiTruck}>
          <p className="text-gray-600 text-sm">
            Delivery 3-5 Days Cairo — 5-7 Days Other Governorates
          </p>
        </Accordion>

        <Accordion title="Return policy" icon={FiRotateCcw}>
          <p className="text-gray-600 text-sm">
            If return due to defect → free return.
          </p>
        </Accordion>
      </div>

      <div className="mt-4">
        <ShareProduct url={window.location.href} title="Check this product" />
      </div>
    </div>
  );
}
