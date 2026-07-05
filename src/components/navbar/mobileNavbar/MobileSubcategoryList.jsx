import Link from "next/link";

export default function MobileSubCategoryList({
  subcategories,
  isOpen,
  collectionId,
  categoryId,
}) {
  return (
    <ul
      className={`pl-8 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen
          ? "max-h-40 opacity-100 scale-100 mt-1"
          : "max-h-0 opacity-0 scale-95"
      }`}
    >
      {subcategories.map((sub) => (
        <li key={sub.id}>
          {" "}
          {}
          <Link
            href={`/collections/${collectionId}/${categoryId}/${sub.id}`} 
            className="block py-1 hover:underline"
          >
            {sub.slug.charAt(0).toUpperCase() + sub.slug.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
