"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Logo from "../../assets/logo kazary.webp";

export default function OrderSummary({
  cart,
  shipping,

  // coupon controlled from parent
  coupon,
  setCoupon,
  errorCoupon,
  setErrorCoupon,

  onApplyCoupon,
  onRemoveCoupon,
  loadingCoupon,
  loadingRemoveCoupon,
}) {
  const items = cart?.items || [];

  const itemsPrice = cart?.totalPrice || 0;
  const discount = cart?.discountAmount || 0;
  const afterDiscount = cart?.totalPriceAfterDiscount || itemsPrice;

  const shippingPrice = shipping?.price || 0;
  const isFreeShipping = cart?.freeShipping?.isFreeShipping;

  const finalShipping = isFreeShipping ? 0 : shippingPrice;
  const total = afterDiscount + finalShipping;

  // ================= APPLY =================
  const handleApply = () => {
    if (!coupon?.trim()) {
      setErrorCoupon?.("Enter coupon code");
      return;
    }

    setErrorCoupon?.("");
    onApplyCoupon?.(coupon.trim());
  };

  // ================= REMOVE =================
  const handleRemove = () => {
    onRemoveCoupon?.();
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={Logo} alt="logo" className="w-28 object-contain" />
      </div>

      {/* ================= ITEMS ================= */}
      {items.map((item) => (
        <div key={item._id} className="flex items-start justify-between gap-4">
          <div className="relative flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />

            <div className="absolute -top-2 left-12 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {item.quantity}
            </div>

            <div>
              <p className="font-medium">{item.title}</p>
              <span className="text-sm text-muted-foreground">
                {item.color} / {item.size}
              </span>
            </div>
          </div>

          <p className="font-medium">
            E£ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      {/* ================= COUPON ================= */}
      <div className="space-y-2">
        {cart?.coupon ? (
          <div className="flex justify-between items-center p-2 border rounded bg-green-50">
            <div>
              <p className="text-xs text-green-700 font-medium">
                Coupon Applied
              </p>
              <p className="text-xs text-green-600">{cart.coupon.code}</p>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={loadingRemoveCoupon}
              className="text-xs text-red-600 hover:underline"
            >
              {loadingRemoveCoupon ? "..." : "Remove"}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setErrorCoupon?.("");
              }}
              placeholder="Discount code"
            />

            <button
              type="button"
              onClick={handleApply}
              disabled={loadingCoupon}
              className="bg-muted border hover:cursor-pointer hover:bg-gray-100 rounded-md px-4  transition"
            >
              {loadingCoupon ? "..." : "Apply"}
            </button>
          </div>
        )}

        {errorCoupon && <p className="text-xs text-red-500">{errorCoupon}</p>}
      </div>

      {/* ================= PRICES ================= */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>E£ {itemsPrice.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-red-500">
            <span>Discount</span>
            <span>- E£ {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>After Discount</span>
          <span>E£ {afterDiscount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          {isFreeShipping ? (
            <span className="font-medium">Free</span>
          ) : shipping?.city ? (
            <span>E£ {finalShipping.toFixed(2)}</span>
          ) : (
            <span className="text-muted-foreground">Select city</span>
          )}
        </div>

        {cart?.freeShipping && !isFreeShipping && (
          <div className="text-xs text-muted-foreground">
            Spend E£ {cart.freeShipping.remaining} more for free shipping
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold text-lg pt-2">
          <span>Total</span>
          <span>E£ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
