"use client";

import { useRouter } from "next/navigation";

import {
  FiUser,
  FiLogOut,
  FiGrid,
  FiUserCheck,
  FiShoppingBag,
  FiStar,
  FiHeart,
  FiMapPin,
  FiShield,
} from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserNavigate({ user, onLogout }) {
  const router = useRouter();

  const handleClick = (value) => {
    if (value === "logout") {
      onLogout();
    } else {
      router.push(value);
    }
  };

  if (user === undefined) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="outline-none border-none bg-transparent p-0">
          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() || <FiUser />}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl space-y-1 p-2">
        {user ? (
          <>
            <DropdownMenuItem onClick={() => handleClick("/profile")}>
              <FiUserCheck className="mr-2" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile")}>
              <FiGrid className="mr-2" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile/orders")}>
              <FiShoppingBag className="mr-2" />
              My orders
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile/reviews")}>
              <FiStar className="mr-2" />
              My Reviews
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile/wishlist")}>
              <FiHeart className="mr-2" />
              Wishlist
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile/addresses")}>
              <FiMapPin className="mr-2" />
              Addresses
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/profile/security")}>
              <FiShield className="mr-2" />
              Security
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleClick("logout")}
              className="text-red-500"
            >
              <FiLogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => handleClick("/auth?mode=login")}>
              <FiUser className="mr-2" />
              Login
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleClick("/auth?mode=signup")}>
              <FiUserCheck className="mr-2" />
              Signup
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
