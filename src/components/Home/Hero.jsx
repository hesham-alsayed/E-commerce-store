"use client";

import Link from "next/link";

export default function Hero({ bannerSection }) {
  const { image, title, description, buttonLink, buttonText } =
    bannerSection?.props || {};

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <img
          src={image?.url}
          alt={title || "Hero"}
          className="w-full h-100 md:h-125 lg:h-150 object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold uppercase">
              {title}
            </h1>

            <p className="mt-4 text-sm md:text-lg capitalize lg:text-xl mb-6">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="bg-white text-black px-10 py-2 rounded text-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
