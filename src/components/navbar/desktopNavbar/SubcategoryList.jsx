"use client";

import Link from "next/link";

export default function SubcategoryList({
  subcategories,
  collection,
  category,
  closeMenu,
}) {
  return (
    <ul className="absolute left-49 top-0 ml-2 bg-white shadow-lg rounded-lg p-4 min-w-50">
      {subcategories.map((sub) => (
        <li onClick={closeMenu} key={sub.id}>
          <Link
            href={`/products?collection=${collection.id}&category=${category.id}&subcategory=${sub.id}`}
            className="block px-2 py-1 hover:bg-gray-100 rounded"
          >
            {sub.slug.charAt(0).toUpperCase() + sub.slug.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
