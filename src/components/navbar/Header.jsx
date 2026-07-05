import { useState } from "react";
import Navbar from "./Navbar";
import ShopCart from "../cart/ShopCart";

export default function Header() {
  const [shopCartOpen, setShopCartOpen] = useState(false);
  return (
    <div className="relative z-50">
      <Navbar setShopCartOpen={setShopCartOpen} />
      <ShopCart isOpen={shopCartOpen} setShopCartOpen={setShopCartOpen} />
    </div>
  );
}
