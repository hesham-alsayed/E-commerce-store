"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiShield,
  FiStar,
  FiLogOut,
} from "react-icons/fi";

const accountLinks = [
  { name: "Account", path: "/account", icon: FiUser },
  { name: "Orders", path: "/account/orders", icon: FiShoppingBag },
  { name: "Wishlist", path: "/account/wishlist", icon: FiHeart },
  { name: "Addresses", path: "/account/addresses", icon: FiMapPin },
  { name: "Security", path: "/account/security", icon: FiShield },
  { name: "Reviews", path: "/account/reviews", icon: FiStar },
];

export default function AccountLinks() {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <div className="border-b pb-4 mb-4 pl-4">
      <p className="font-semibold text-[16px] uppercase">My Account</p>
      <ul className="my-4 space-y-2">
        {accountLinks.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                  link.path === currentPath
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            </li>
          );
        })}

        <li className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 bg-red-800 text-white py-2 rounded-md hover:bg-red-900 transition">
            <FiLogOut size={18} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
