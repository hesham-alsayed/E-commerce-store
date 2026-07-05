"use client";

import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";
import { getAllPages } from "@/api/pageApi";

// ================= COMPONENTS =================
import Hero from "@/components/Home/Hero";
import TextSection from "@/components/Home/TextSection";


import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/Home/ProductsSection";

export default function Home() {
  // ================= STATE =================
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PAGES =================
  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);

        const data = await getAllPages();

        setPages(data?.pages || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch pages");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  // ================= HOME PAGE =================
  const homePage = useMemo(() => {
    return pages.find((page) => page.slug === "/home");
  }, [pages]);

  // ================= SORTED SECTIONS =================
  const sections = useMemo(() => {
    if (!homePage?.sections) return [];

    return [...homePage.sections].sort((a, b) => {
      const aOrder = a.order ?? 9999;
      const bOrder = b.order ?? 9999;

      return aOrder - bOrder;
    });
  }, [homePage]);

  // ================= FULL SCREEN LOADER =================
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  console.log(sections);

  return (
    <section className="mt-15">
      {/* ================= DYNAMIC SECTIONS ================= */}
      {sections.map((section) => {
        switch (section.type) {
          case "banner":
            return <Hero key={section._id} bannerSection={section} />;

          case "text":
            return <TextSection key={section._id} section={section} />;

          case "products":
            return <ProductsSection key={section._d} section={section} />;
          default:
            return null;
        }
      })}

      {/* ================= STATIC SECTIONS ================= */}

      <FeaturedSection />

      <Footer />
    </section>
  );
}
