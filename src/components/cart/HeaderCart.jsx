"use client";

import { FiX } from "react-icons/fi";
import { ClearCartModal } from "@/modal/ClearCartModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";

export default function HeaderCart({ setShopCartOpen }) {
  const dispatch = useDispatch();
  const { loading, cart } = useSelector(state => state.cart);

  const count = cart?.items?.length || 0;

  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative text-[17px] font-medium text-gray-800 flex items-center">
        Cart
        <span className="bg-gray-200 text-black w-5 h-5 flex items-center justify-center rounded absolute top-0 -right-8 text-xs">
          {count}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {count > 0 && (
          <button
            onClick={() => setOpenDelete(true)}
            className="text-sm text-red-500 bg-gray-50 rounded-sm border px-6 py-2 hover:text-red-600"
          >
            Clear cart
          </button>
        )}

        <button
          onClick={() => setShopCartOpen(false)}
          className="hover:bg-gray-200 rounded p-1"
        >
          <FiX size={15} />
        </button>

        <ClearCartModal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={async () => {
            await dispatch(clearCart());
            setOpenDelete(false);
            setShopCartOpen(false);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}
