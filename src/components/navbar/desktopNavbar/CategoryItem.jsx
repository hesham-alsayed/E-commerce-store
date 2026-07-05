"use client";

import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import SubcategoryList from "./SubcategoryList";
export default function CategoryItem({
  category,
  collection,
  activeCategory,
  setActiveCategory,
  closeMenu,
}) {
  return (
    <li
      onMouseEnter={() => setActiveCategory(category.id)}
      className="relative"
    >
      <div className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer rounded">
        <Link
          href={`/products?collection=${collection.id}&category=${category.id}`}
        >
          {category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}
        </Link>

        {category.subcategories?.length > 0 && <AiOutlineRight />}
      </div>

      {activeCategory === category.id && category.subcategories?.length > 0 && (
        <SubcategoryList
          subcategories={category.subcategories}
          collection={collection}
          category={category}
          closeMenu={closeMenu}
        />
      )}
    </li>
  );
}
