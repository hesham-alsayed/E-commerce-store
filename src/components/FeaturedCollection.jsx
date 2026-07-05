import { FaArrowRight } from "react-icons/fa6";

export default function FeaturedCollection() {
  return (
    <section className="px-4 md:px-10 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto bg-[#dce8e2] rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <p className="text-sm font-medium text-gray-600 mb-3">
              Comfort and Style
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Apparel made for your everyday life
            </h2>

            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
              Discover high-quality, comfortable clothing that effortlessly
              blends fashion and function.
            </p>

            <button className="group bg-black text-white px-6 py-3 rounded-lg text-sm md:text-base flex items-center gap-2 hover:opacity-90 transition">
              Shop Now
              <FaArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="relative w-full lg:w-1/2 h-100 md:h-125 lg:h-150">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
              alt="Featured Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-l from-black/40 via-black/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
