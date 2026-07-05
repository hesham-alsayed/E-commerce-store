"use client";

import { useState, useRef, useEffect } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({
  label,
  value,
  options = [],
  onChange,
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="space-y-1 relative" ref={dropdownRef}>
      <label className="text-sm font-medium">
        {label}
      </label>

      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full h-10 px-3
          border rounded-md
          flex items-center justify-between
          bg-white
          hover:border-black/40
          transition
        "
      >
        <span className="truncate">
          {value === "all" || !value
            ? placeholder
            : value}
        </span>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute z-50 mt-2
              w-full bg-white
              border rounded-md shadow-lg
              overflow-hidden
            "
          >
            <div className="max-h-60 overflow-y-auto p-1">
              <button
                type="button"
                onClick={() => {
                  onChange("all");
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-md
                  hover:bg-gray-100 transition
                  ${
                    value === "all"
                      ? "bg-black text-white hover:bg-black"
                      : ""
                  }
                `}
              >
                All
              </button>

              {options.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2 rounded-md
                    hover:bg-gray-100 transition
                    ${
                      value === item
                        ? "bg-black text-white hover:bg-black"
                        : ""
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}