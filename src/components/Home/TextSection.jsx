"use client";

import Link from "next/link";

export default function TextSection({ section }) {
  const { title, description, buttonText, buttonLink } = section?.props || {};

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
            {title}
          </h2>

          <p className="mt-6 text-gray-600 text-sm md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>

          {buttonText && (
            <Link
              href={buttonLink || "/shop"}
              className="mt-8 bg-black text-white px-8 py-3 rounded-md text-sm md:text-base hover:bg-gray-800 transition-all duration-300"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
