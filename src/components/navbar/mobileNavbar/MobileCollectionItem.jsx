import { AiOutlineRight } from "react-icons/ai";
import MobileCategoryItem from "./MobileCategoryItem";

export default function MobileCollectionItem({
  collection,
  mobileCollection,
  mobileCategory,
  setMobileCollection,
  setMobileCategory,
}) {
  const isOpen = mobileCollection === collection.id; 

  return (
    <li>
      <div
        className={`flex justify-between items-center py-2 px-4 font-medium cursor-pointer rounded-xl ${
          isOpen ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          if (isOpen) {
            setMobileCollection(null);
            setMobileCategory(null);
          } else {
            setMobileCollection(collection.id); 
            setMobileCategory(null);
          }
        }}
      >
        {collection.slug.toUpperCase()} {}
        {collection.categories?.length > 0 && (
          <AiOutlineRight
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>

      <ul
        className={`pl-6 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 scale-y-100 mt-2"
            : "max-h-0 opacity-0 scale-y-95"
        }`}
      >
        {collection.categories?.map((category) => (
          <MobileCategoryItem
            key={category.id} 
            category={category}
            collectionId={collection.id} 
            mobileCategory={mobileCategory}
            setMobileCategory={setMobileCategory}
          />
        ))}
      </ul>
    </li>
  );
}
