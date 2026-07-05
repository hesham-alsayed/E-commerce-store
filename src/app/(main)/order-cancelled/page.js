"use client";

import { useRouter } from "next/navigation";
import { motion as _motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function CancelPaymentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <_motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6 text-center"
      >
        {}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="text-red-600 w-10 h-10" />
          </div>
        </div>

        {}
        <h1 className="text-lg font-semibold text-gray-900">
          Payment Cancelled
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Your payment was not completed. You can try again or continue shopping.
        </p>

        {}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Status</span>
            <span className="text-red-600 font-medium">Cancelled</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium">PayPal</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Next Step</span>
            <span className="font-medium">Retry Payment</span>
          </div>
        </div>

        {}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.replace("/checkout")}
            className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-80 transition text-sm"
          >
            Try Again
          </button>

          <button
            onClick={() => router.replace("/products")}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
          >
            Continue Shopping
          </button>
        </div>

        {}
        <p className="text-xs text-gray-400 mt-6">
          No charges were made to your account.
        </p>
      </_motion.div>
    </div>
  );
}
