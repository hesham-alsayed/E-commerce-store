"use client";

import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

export default function BottomCart({ setShopCartOpen }) {
  const { cart } = useSelector(state => state.cart);
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/checkout");
    setShopCartOpen(false);
  };
  console.log(cart);

  return (
    <div className="p-2 shadow-t border-t border-gray-200">
      <button
        disabled={cart.items.length === 0}
        onClick={handleNavigate}
        className={`
    w-full flex items-center text-sm justify-evenly rounded py-2 px-4 transition
    ${
      cart.items.length === 0
        ? "bg-gray-100 cursor-not-allowed opacity-70"
        : "bg-black text-white hover:opacity-80 cursor-pointer"
    }
  `}
      >
        <span className="flex items-center gap-3">
          <IoBagCheckOutline size={18} />
          <span className="font-medium">Checkout</span>
        </span>
        <span className="font-semibold">
          {" "}
          LE {Math.floor(cart.totalPriceAfterDiscount) || cart.totalPrice}{" "}
          EGP{" "}
        </span>
      </button>

      <p className="text-[12px] text-center text-gray-600 mt-2">
        Shipping, taxes and discount codes calculated at checkout
      </p>
      <Link
        onClick={() => setShopCartOpen(false)}
        href={"/cart-details"}
        className="text-xs flex items-center gap-1 py-4 hover:text-black  justify-center underline text-gray-700"
      >
        Go to cart page <IoIosArrowForward />
      </Link>
    </div>
  );
}
