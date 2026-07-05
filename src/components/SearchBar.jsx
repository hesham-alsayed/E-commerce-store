"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ setSearchOpen }) {
  const [searchValue, setSearchValue] = useState("");
  const handleChangeValue = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  console.log(searchValue);
  return (
    <div className="max-w-2xl mx-auto mt-2 bg-gray-100 rounded-xl py-2 px-6 flex items-center gap-4">
      <FiSearch className=" cursor-pointer size-5 text-gray-500" />

      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleChangeValue(e)}
        placeholder="Search Products..."
        className="flex-1 outline-none text-sm"
        autoFocus
      />

      <button className=" cursor-pointer" onClick={() => setSearchOpen(false)}>
        <FiX className="size-5" />
      </button>
    </div>
  );
}
