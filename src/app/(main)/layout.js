"use client";
import Header from "@/components/navbar/Header";
import SearchModal from "@/components/SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSearch } from "@/lib/features/productsSlice";

export default function MainLayout({ children }) {
  const openSearch = useSelector((state) => state.products.openSearch);
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <SearchModal
        openSearch={openSearch}
        setOpenSearch={(val) => dispatch(setOpenSearch(val))}
        applySearch={() => {}}
      />
      <div className="container mx-auto mt-7.5">
        {children}
      </div>
    </div>
  );
}
