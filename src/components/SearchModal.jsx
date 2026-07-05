"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModalBehavior } from "@/hooks/useModalBeahavior";
import { XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchModal({
  openSearch,
  setOpenSearch,
  applySearch,
  searchParams,
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const isProductsPage = pathname === "/products";
  useEffect(() => {
    const check = () => {
      setValue(initialValue || "");
    };
    check();
  }, [initialValue]);

  useEffect(() => {
    if (openSearch) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [openSearch]);

  const handleSearch = () => {
    if (!value.trim()) return;

    const trimmed = value.trim();

    if (!isProductsPage) {
      router.push(`/products?search=${trimmed}&page=1`);
      setOpenSearch(false);
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set("search", trimmed);
    params.set("page", "1");

    applySearch(trimmed);

    setOpenSearch(false);
  };

  const onClose = () => setOpenSearch(false);

  const { handleOverlayClick, overlayRef } = useModalBehavior(
    openSearch,
    onClose,
  );

  return (
    <AnimatePresence>
      {openSearch && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            ref={overlayRef}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-500 p-3 sm:p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="
                relative
                w-full
                max-w-md
                sm:max-w-xl
                bg-white
                rounded-2xl
                p-4 sm:p-6
                shadow-xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="
                  absolute top-3 right-3
                  w-9 h-9
                  flex items-center justify-center
                  rounded-full
                  text-gray-500
                  hover:bg-gray-100
                  hover:text-black
                  transition
                "
              >
                <XIcon size={18} />
              </button>

              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Search Products
              </h2>

              <div
                className="
                  flex flex-col sm:flex-row
                  gap-3
                "
              >
                <Input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search products..."
                  className="
                    flex-1
                    py-3 md:py-5
                    text-base
                    focus-visible:ring-0
                    focus-visible:outline-none
                  "
                />

                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-6 py-5"
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
