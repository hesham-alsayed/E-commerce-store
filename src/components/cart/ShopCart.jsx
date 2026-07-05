"use client";

import { TbDiscount } from "react-icons/tb";
import { TfiNotepad } from "react-icons/tfi";
import { FiShoppingCart } from "react-icons/fi";

import HeaderCart from "./HeaderCart";
import FreeShippingProgress from "./FreeShippingProgress";
import CartItem from "./CartItem";
import Accordion from "./Accordian";
import BottomCart from "./BottomCart";
import { useEffect, useMemo, useState } from "react";

import { motion as _motion, AnimatePresence } from "framer-motion";
import CartItemSkeleton from "@/skeleton/CartItemSkeleton";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { DeleteModal } from "@/modal/DeleteModal";
import { apiFetch } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart, applyCoupon, removeCoupon, fetchCart } from "@/lib/features/cartSlice";

export default function ShopCart({ isOpen, setShopCartOpen }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { loading } = cart;

  const [coupon, setCoupon] = useState("");
  const [errorCoupon, setErrorCoupon] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [couponRemovedId, setCouponRemovedId] = useState(null);
  const [settings, setSettings] = useState(null);
  const items = cart?.items || [];

  const hasValidCoupon =
    cart?.coupon && cart?.discountAmount > 0 && cart?.items?.length > 0;
  const discount = cart?.discountAmount || 0;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item._id));
  };
  const getGeneralSettings = async (key) => {
    try {
      const { data } = await apiFetch({ path: `/settings/key/${key}`, method: "GET" });
      console.log(data);
      setSettings(data?.data?.setting || data?.setting);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const key = process.env.NEXT_PUBLIC_GENERAL_SETTINGS;

      if (!key) {
        console.warn("Missing VITE_GENERAL_SETTINGS");
        return;
      }

      await getGeneralSettings(key);
    };

    fetchData();
  }, []);

  const freeShippingSetting = useMemo(() => {
    if (!settings?.value) return null;

    return settings.value.find(
      (v) => v.type === process.env.NEXT_PUBLIC_FREE_SHIPPING_SETTING,
    );
  }, [settings]);
  const increase = (item) => {
    dispatch(updateQuantity({ itemId: item._id, quantity: item.quantity + 1 }))
      .unwrap()
      .catch((err) => toast.error(err || "Stock limit reached"));
  };

  const decrease = (item) => {
    if (item.quantity <= 1) return;
    dispatch(updateQuantity({ itemId: item._id, quantity: item.quantity - 1 }))
      .unwrap()
      .catch((err) => toast.error(err || "Error updating quantity"));
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

      await dispatch(fetchCart());

      toast.success("Coupon applied");
    } catch (error) {
      setErrorCoupon(error || "Error applying coupon");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const onClickRemove = (couponId) => {
    setCouponRemovedId(couponId);
    setOpenDeleteModal(true);
  };

  const handleRemoveCoupon = async () => {
    try {
      setLoadingRemove(true);
      await dispatch(removeCoupon()).unwrap();
      await dispatch(fetchCart());
      toast.success("coupon removed");
    } catch (error) {
      toast.error(error?.message || error || "Error in Remove Coupon");
    } finally {
      setLoadingRemove(false);
      setOpenDeleteModal(false);
      setCouponRemovedId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <_motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShopCartOpen(false)}
          />

          <_motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="fixed top-0 right-0 h-full w-120 max-w-full bg-white z-50"
          >
            <div className="flex flex-col h-full px-2 py-4 overflow-hidden">
              <HeaderCart setShopCartOpen={setShopCartOpen} />

              <div className="flex-1 overflow-y-auto">
                <FreeShippingProgress
                  cart={cart}
                  setting={freeShippingSetting}
                />
                {hasValidCoupon && (
                  <div className="mb-3 p-2 border rounded bg-green-50 border-green-200">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium text-green-700">
                        Coupon Applied
                      </p>

                      <p className="text-xs font-semibold text-green-700">
                        -{discount} EGP
                      </p>
                    </div>

                    <button
                      onClick={() => onClickRemove(cart.coupon)}
                      className="text-xs text-red-600 hover:underline mt-1"
                    >
                      Remove coupon
                    </button>
                  </div>
                )}

                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => <CartItemSkeleton key={i} />)
                ) : items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-15 text-center">
                    <FiShoppingCart className="text-5xl text-gray-300 mb-4" />
                    <p className="text-lg font-medium text-gray-700">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      onIncrease={increase}
                      onDecrease={decrease}
                      onRemove={handleRemove}
                    />
                  ))
                )}

                {items.length > 0 && (
                  <>
                    <Accordion title="Discount code" icon={TbDiscount}>
                      <div className="flex gap-2 max-w-xl">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setErrorCoupon("");
                          }}
                          placeholder="Discount code"
                          className="flex-1 px-2 py-1 border rounded bg-gray-100"
                        />

                        <Button
                          onClick={handleApplyCoupon}
                          disabled={loadingCoupon || !coupon.trim()}
                        >
                          {loadingCoupon ? "..." : "Apply"}
                        </Button>
                      </div>

                      {errorCoupon && (
                        <p className="text-red-600 text-xs mt-1">
                          {errorCoupon}
                        </p>
                      )}
                    </Accordion>

                    <Accordion icon={TfiNotepad} title="Order note">
                      <textarea className="w-full h-32 p-3 border rounded" />
                    </Accordion>
                  </>
                )}
              </div>

              <DeleteModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                itemTitle={couponRemovedId}
                title={"Coupon"}
                isLoadingDelete={loadingRemove}
                onConfirm={handleRemoveCoupon}
              />

              <BottomCart cart={cart} setShopCartOpen={setShopCartOpen} />
            </div>
          </_motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
