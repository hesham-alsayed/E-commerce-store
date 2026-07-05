import CollectionItem from "./CollectionItem";

export default function DesktopNavbar({
  collections,
  activeCollection,
  activeCategory,
  setActiveCollection,
  setActiveCategory,
  closeMenu,
}) {
  return (
    <ul className="hidden gap-1 md:flex md:gap-2 font-medium text-[13px] lg:text-[16px]">
      {collections.map((collection) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          activeCollection={activeCollection}
          activeCategory={activeCategory}
          setActiveCollection={setActiveCollection}
          setActiveCategory={setActiveCategory}
          closeMenu={closeMenu}
        />
      ))}
    </ul>
  );
}
