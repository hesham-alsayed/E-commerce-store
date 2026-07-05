"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { X } from "lucide-react";
import Logo from "@/components/Logo";

export default function MobileNavbar({ open, onClose, collections }) {
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const format = (text) =>
    text?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Logo height={10}/>
          <button onClick={onClose} className=" hover:bg-gray-100 p-2 rounded-full hover:cursor-pointer">
            <X />
          </button>
        </div>

        <ul className="p-3 space-y-2 overflow-y-auto h-full">
          {collections.map((collection) => (
            <li key={collection.id}>
              <div
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setActiveCollection(
                    activeCollection === collection.id ? null : collection.id,
                  );
                  setActiveCategory(null);
                }}
              >
                <span>
                  <Link
                    href={`/products?collection=${collection.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="font-medium text-sm"
                  >
                    {format(collection.slug)}
                  </Link>
                </span>

                <AiOutlineRight
                  className={`transition ${
                    activeCollection === collection.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeCollection === collection.id
                    ? "max-h-[500px]"
                    : "max-h-0"
                }`}
              >
                <ul className="ml-3 mt-2 space-y-1 border-l pl-3">
                  {collection.categories?.map((category) => (
                    <li key={category.id}>
                      <div
                        className="flex items-center justify-between px-2 py-2 rounded hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setActiveCategory(
                            activeCategory === category.id ? null : category.id,
                          );
                        }}
                      >
                        <span>
                          <Link
                            href={`/products?collection=${collection.id}&category=${category.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                            }}
                            className="text-sm text-gray-700"
                          >
                            {format(category.slug)}
                          </Link>
                        </span>

                        {category.subcategories?.length > 0 && (
                          <AiOutlineRight
                            className={`transition ${
                              activeCategory === category.id ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeCategory === category.id
                            ? "max-h-[400px]"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="ml-3 mt-1 space-y-1 border-l pl-3">
                          {category.subcategories?.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/products?collection=${collection.id}&category=${category.id}&subcategory=${sub.id}`}
                                onClick={onClose}
                                className="block w-full px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded"
                              >
                                {format(sub.slug)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
