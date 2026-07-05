"use client";

import Link from "next/link";
import CategoryItem from "./CategoryItem";

export default function CollectionItem({
  collection,
  activeCollection,
  activeCategory,
  setActiveCollection,
  setActiveCategory,
  closeMenu,
}) {
  return (
    <li
      onMouseEnter={() => {
        setActiveCollection(collection.id);
        setActiveCategory(null);
      }}
      className="relative"
    >
      <Link
        href={`/products?collection=${collection.id}`}
        className="px-2 md:px-3 py-1 rounded-md hover:bg-gray-100"
      >
        {collection.slug.toUpperCase()}
      </Link>

      {activeCollection === collection.id && (
        <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 min-w-55 z-50">
          {collection.categories?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              collection={collection}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
