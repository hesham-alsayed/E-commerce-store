"use client";

import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
    const router = useRouter()
  return (
    <div className="mt-40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow text-center">
        <div className="mb-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl">
            <FaCartShopping />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Your cart is empty
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
