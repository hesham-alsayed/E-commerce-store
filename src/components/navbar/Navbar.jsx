"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

import Logo from "../Logo";
import DesktopNavbar from "./desktopNavbar/DesktopNavbar";
import Icons from "../Icons";
import MobileNavbar from "./mobileNavbar/MobileNavbar";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavLinks } from "@/lib/features/navbarSlice";

export default function Navbar({ setShopCartOpen }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const dispatch = useDispatch();
  const { navLinks: collections, loaded } = useSelector(state => state.navbar);

  const [activeCollection, setActiveCollection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const [openSidebar, setOpenSidebar] = useState(false);

  const [showMarquee, setShowMarquee] = useState(true);
  const lastScrollY = useRef(0);

  const marqueeItems = [
    "🔥 New Arrivals",
    "🚚 Free Shipping",
    "💳 Secure Payment",
    "🎉 50% OFF Today",
    "⭐ Best Quality",
  ];

  useEffect(() => {
    if (!loaded) dispatch(fetchNavLinks());
  }, [loaded]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setShowMarquee(current < 80);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setActiveCollection(null);
    setActiveCategory(null);
  };

  return (
    <>
      {isHome && (
        <div
          className={`fixed top-0 left-0 w-full bg-black text-white overflow-hidden z-40 transition-all duration-300 ${
            showMarquee ? "h-8 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex whitespace-nowrap animate-marquee text-sm py-1">
            {marqueeItems.concat(marqueeItems).map((item, i) => (
              <div key={i} className="px-8">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <nav
        onMouseLeave={closeMenu}
        className="fixed left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
        style={{
          top: isHome && showMarquee ? "32px" : "0px",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 lg:px-8 h-14">
          <div className="flex items-center gap-10">
            <Logo height={10} />

            <div className="hidden md:block">
              <DesktopNavbar
                collections={collections || []}
                activeCollection={activeCollection}
                activeCategory={activeCategory}
                setActiveCollection={setActiveCollection}
                setActiveCategory={setActiveCategory}
                closeMenu={closeMenu}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icons setShopCartOpen={setShopCartOpen} />

            <button
              onClick={() => setOpenSidebar(true)}
              className="md:hidden ml-2 hover:bg-gray-100 p-2 rounded-full"
            >
              <AiOutlineMenuFold size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MobileNavbar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        collections={collections || []}
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </>
  );
}
