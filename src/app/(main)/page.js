"use client";

import { useEffect, useState } from "react";

import { getAllPages } from "@/api/pageApi";

import Hero from "@/components/Home/Hero";
import TextSection from "@/components/Home/TextSection";

import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import ProductsSection from "@/components/Home/ProductsSection";

const CACHE_KEY = "cached_home_sections";
const CACHE_TTL = 2 * 24 * 60 * 60 * 1000; 

function sortSections(homePage) {
  if (!homePage?.sections) return [];
  return [...homePage.sections].sort((a, b) => {
    const aOrder = a.order ?? 9999;
    const bOrder = b.order ?? 9999;
    return aOrder - bOrder;
  });
}

export default function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);

        if (Date.now() - timestamp < CACHE_TTL) {
          setSections(data || []);
          setLoading(false);
          return;
        }
      } catch {
        
      }
    }

    const fetchPages = async () => {
      try {
        const data = await getAllPages();
        const homePage = (data?.pages || []).find(
          (page) => page.slug === "/home",
        );
        const sorted = sortSections(homePage);

        setSections(sorted);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: sorted, timestamp: Date.now() }),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

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
      {sections.map((section) => {
        switch (section.type) {
          case "banner":
            return <Hero key={section._id} bannerSection={section} />;

          case "text":
            return <TextSection key={section._id} section={section} />;

          case "products":
            return <ProductsSection key={section._id} section={section} />;
          default:
            return null;
        }
      })}

      <FeaturedSection />

      <Footer />
    </section>
  );
}
