"use client";

import { useState, useEffect, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

export default function PriceFilter({
  priceMin,
  priceMax,
  maxRange = 5000,
  setFilter,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const min = Number(priceMin || 0);
  const max = Number(priceMax || maxRange);

  // ================= CLOSE OUTSIDE =================
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ================= SLIDER CHANGE =================
  const handleSliderChange = (e, value) => {
    setFilter("priceMin", value[0]);
    setFilter("priceMax", value[1]);
  };

  return (
    <div className="mt-2 relative" ref={dropdownRef}>
      {/* BUTTON */}
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen(!open)}
      >
        Price
      </Button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mt-2 space-y-3"
          >
            {/* SLIDER */}
            <Box sx={{ px: 1 }}>
              <Slider
                value={[min, max]}
                min={0}
                max={maxRange}
                onChange={handleSliderChange}
                sx={{
                  color: "#000",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                  },
                }}
              />
            </Box>

            {/* INPUTS */}
            <div className="flex gap-3">
              <input
                type="number"
                value={min}
                onChange={(e) => setFilter("priceMin", e.target.value)}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Min"
              />

              <input
                type="number"
                value={max}
                onChange={(e) => setFilter("priceMax", e.target.value)}
                className="w-full border p-2 rounded-md text-sm"
                placeholder="Max"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
