"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchResultBar({ searchParams, applySearch }) {
  const searchValue = searchParams.get("search") || "";

  const [value, setValue] = useState("");

  useEffect(() => {
    const check = () => {
      setValue(searchValue);
    };
    check();
  }, [searchValue]);

  const handleSearch = () => {
    applySearch(value);
  };

  const clearSearch = () => {
    setValue("");
    applySearch(""); 
  };

  if(!searchValue) return null

  return (
    <div className="mb-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl text-center">Search results</h1>

      <div className="w-full max-w-2xl flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products..."
            className="pr-20"
          />

          {value && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
