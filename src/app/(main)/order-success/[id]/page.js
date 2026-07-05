"use client";

import { useRouter } from "next/navigation";
import { motion as _motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";
import { useEffect } from "react";

export default function SuccessPaymentPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  // =====================================================
  // CLEAR CART + BLOCK BACK
  // =====================================================
  useEffect(() => {
    dispatch(clearCart());

    // replace current history entry
    window.history.replaceState(null, "", "/success-payment");

    const handleBack = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return (
    <div className="  flex items-center justify-center px-4">
      <_motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white mt-10 w-full max-w-2xl rounded-2xl shadow-lg p-4 text-center"
      >
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-sm font-bold text-gray-900">Order Confirmed</h1>

        <p className="text-sm text-gray-500 mt-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* ORDER INFO CARD */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-medium">Paid</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium">PayPal</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Delivery</span>
            <span className="font-medium">Processing</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/profile/orders")}
            className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-80 transition text-sm"
          >
            View My Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
          >
            Continue Shopping
          </button>
        </div>

        {/* SMALL NOTE */}
        <p className="text-xs text-gray-400 mt-6">
          You will receive an email confirmation shortly.
        </p>
      </_motion.div>
    </div>
  );
}
