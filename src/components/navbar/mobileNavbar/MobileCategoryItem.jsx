import { AiOutlineRight } from "react-icons/ai";
import MobileSubCategoryList from "./MobileSubcategoryList";

export default function MobileCategoryItem({
  category,
  collectionId,
  mobileCategory,
  setMobileCategory,
}) {
  const isOpen = mobileCategory === category.id; // ✅ ID

  return (
    <li>
      <div
        className={`flex justify-between py-1 px-4 cursor-pointer rounded-xl ${
          isOpen ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          setMobileCategory(isOpen ? null : category.id);
        }}
      >
        {category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}

        {category.subcategories?.length > 0 && (
          <AiOutlineRight
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>

      {category.subcategories?.length > 0 && (
        <MobileSubCategoryList
          subcategories={category.subcategories}
          isOpen={isOpen}
          collectionId={collectionId}
          categoryId={category.id} // ✅ FIX
        />
      )}
    </li>
  );
}
