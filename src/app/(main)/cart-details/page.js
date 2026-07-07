"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { TbDiscount } from "react-icons/tb";
import { TfiNotepad } from "react-icons/tfi";
import Accordion from "@/components/cart/Accordian";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import {
  updateQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from "@/lib/features/cartSlice";
import CartPageSkeleton from "@/skeleton/CartPageSkeleton";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import LoaderSpinnerButton from "@/components/LoaderSpinnerButton";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { loading, initialized } = cart;

  const [coupon, setCoupon] = useState("");
  const [errorCoupon, setErrorCoupon] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const isLoading = loading || !cart || !initialized;

  if (isLoading) {
    return <CartPageSkeleton />;
  }

  const items = cart?.items ?? [];

  const increase = (item) => {
    dispatch(updateQuantity({ itemId: item._id, quantity: item.quantity + 1 }))
      .unwrap()
      .catch((err) => toast.error(err || "Error updating quantity"));
  };

  const decrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ itemId: item._id, quantity: item.quantity - 1 }))
        .unwrap()
        .catch((err) => toast.error(err || "Error updating quantity"));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item._id));
  };

  const handleApplyCoupon = async () => {
    try {
      if (!coupon.trim()) {
        setErrorCoupon("Please enter a coupon code");
        return;
      }

      if (coupon.trim().length < 3) {
        setErrorCoupon("Invalid coupon code");
        return;
      }

      setLoadingCoupon(true);

      await dispatch(applyCoupon(coupon.trim())).unwrap();

      setErrorCoupon("");
      setCoupon("");

      toast.success("Coupon applied");
    } catch (error) {
      setErrorCoupon(error || "Error applying coupon");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setLoadingRemove(true);
      await dispatch(removeCoupon()).unwrap();
      toast.success("Coupon removed");
    } catch (error) {
      toast.error(error?.message || error || "Error removing coupon");
    } finally {
      setLoadingRemove(false);
    }
  };

  if (!isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShoppingCart className="w-14 h-14 text-gray-300 mb-3" />

        <h2 className="text-2xl font-semibold">Your cart is empty</h2>

        <p className="text-muted-foreground mt-2">
          Add some products to get started
        </p>

        <Button className="mt-4">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <>
      {items.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-[30px]">Your cart ({items.length})</h1>

            {items.map((item) => (
              <Card key={item._id} className="p-4">
                <CardContent className="p-0 flex gap-4 items-center">
                  <img
                    src={item.image}
                    className="w-24 h-34 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {item.color}, {item.size}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">
                        LE {(item.price || 0).toFixed(2)} EGP
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button
                      className="hover:bg-gray-100 p-1 rounded-sm border hover:cursor-pointer"
                      onClick={() => decrease(item)}
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="hover:bg-gray-100 p-1 rounded-sm border hover:cursor-pointer"
                      onClick={() => increase(item)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-5 space-y-5 bg-white border rounded-xl shadow-sm">
              <Accordion title="Discount code" icon={TbDiscount}>
                {cart?.coupon ? (
                  <div className="flex items-center justify-between p-2 border rounded bg-green-50 border-green-200">
                    <div>
                      <p className="text-xs text-green-700 font-medium">
                        Coupon Applied
                      </p>
                      <p className="text-xs text-green-600">{cart.coupon.code}</p>
                    </div>

                    <button
                      onClick={handleRemoveCoupon}
                      disabled={loadingRemove}
                      className="w-14 flex items-center justify-center text-xs text-red-600 hover:underline"
                    >
                      {loadingRemove ? <LoaderSpinnerButton color="red" /> : "Remove"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setErrorCoupon("");
                      }}
                      className="h-9 focus-visible:ring-0 border-gray-200 bg-gray-50"
                    />

                    <button
                      onClick={handleApplyCoupon}
                      disabled={loadingCoupon || !coupon.trim()}
                      className="h-9 px-4 rounded-md bg-black text-white text-sm hover:opacity-90 transition w-20 flex items-center justify-center"
                    >
                      {loadingCoupon ? <LoaderSpinnerButton color="white" /> : "Apply"}
                    </button>
                  </div>
                )}

                {errorCoupon && (
                  <p className="text-xs text-red-500 mt-1">{errorCoupon}</p>
                )}
              </Accordion>

              <Accordion title="Order note" icon={TfiNotepad}>
                <textarea className="w-full h-20 p-2 text-sm border rounded-md bg-gray-50" />
              </Accordion>

              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>LE {cart?.totalPrice?.toFixed(2)}</span>
                </div>

                {cart?.discountAmount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Discount</span>
                    <span>- LE {cart.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>
                    LE{" "}
                    {(cart?.totalPriceAfterDiscount > 0
                      ? cart.totalPriceAfterDiscount
                      : cart?.totalPrice || 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href={"/checkout"}>
                <Button className="w-full h-10 text-sm bg-black text-white">
                  <FaRegCalendarCheck className="mr-2" />
                  Checkout
                </Button>
              </Link>

              <Link
                href={"/"}
                className="text-xs text-gray-500 flex items-center justify-center gap-1 pt-2"
              >
                <IoIosArrowBack size={14} />
                Continue shopping
              </Link>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-30 justify-center py-15 text-center">
          <FiShoppingCart size={100} className="text-gray-300 mb-4" />

          <p className="text-[20px] font-medium text-gray-700">
            Your cart is empty
          </p>

          <p className="text-xl text-gray-400 mt-1">
            Add some products to get started
          </p>
        </div>
      )}
    </>
  );
}
