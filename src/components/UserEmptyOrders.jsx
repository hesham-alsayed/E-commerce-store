"use client";

import { motion as _motion } from "framer-motion";
import { PackageX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserEmptyOrders() {
  const router = useRouter();

  return (
    <div className=" py-15 flex items-center justify-center px-4">
      <_motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full   max-w-md rounded-2xl border p-8 text-center"
      >
        <div className="flex justify-center mb-5">
          <div className="bg-gray-100 p-4 rounded-full">
            <PackageX className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          No Orders Found
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          You haven't placed any orders yet. Start shopping and explore our products.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
        >
          Start Shopping
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Your orders will appear here once you make a purchase.
        </p>
      </_motion.div>
    </div>
  );
}
