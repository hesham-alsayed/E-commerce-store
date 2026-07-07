"use client";

import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import UserNavigate from "./UserNavigate";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSearch } from "@/lib/features/productsSlice";
import { logout } from "@/lib/features/authSlice";

export default function Icons({ setShopCartOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const count = cart.initialized ? (cart?.items?.length || 0) : null;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      sessionStorage.removeItem("lastPath");
      router.push("/auth?mode=login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-5">
      <span
        onClick={() => dispatch(setOpenSearch(true))}
        className="cursor-pointer hover:text-gray-700 transition-colors"
      >
        <FiSearch size={17} />
      </span>

      <UserNavigate onLogout={handleLogout} user={user} />

      <div
        className="relative cursor-pointer"
        onClick={() => setShopCartOpen(true)}
      >
        <FiShoppingCart
          size={17}
          className="hover:text-gray-700 transition-colors"
        />
        {count > 0 && (
          <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
            {count}
          </div>
        )}
      </div>
    </div>
  );
}
