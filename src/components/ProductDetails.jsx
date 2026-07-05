"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import { FiTruck, FiRotateCcw, FiBox } from "react-icons/fi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { productsData } from "@/Data/productsData";
import Accordion from "./cart/Accordian";
import ProductPerformance from "./ProductPerformance";
import ShareProduct from "./ShareProduct";
import CustomerReviews from "./CustomerReviews";
import Badge from "./Badge";

export default function ProductDetails() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };
  const { id } = useParams();

  const product = useMemo(() => {
    if (!id) return null;
    return productsData.find((p) => p.id === Number(id));
  }, [id]);

  const firstVariant = product?.variants?.[0];
  const firstSize = firstVariant?.sizes?.find((s) => s.stock > 0);

  const [selectedColor, setSelectedColor] = useState(
    firstVariant?.color || null,
  );

  const [selectedSize, setSelectedSize] = useState(firstSize?.size || null);

  const [mainImage, setMainImage] = useState(firstVariant?.images?.[0] || null);

  const [quantity, setQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const currentVariant = useMemo(() => {
    return product?.variants?.find((v) => v.color === selectedColor);
  }, [product, selectedColor]);

  if (!product) return null;

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  const handleColorChange = (color) => {
    const variant = product.variants.find((v) => v.color === color);

    setSelectedColor(color);
    setMainImage(variant?.images?.[0] || null);

    const firstAvailableSize = variant?.sizes?.find((s) => s.stock > 0);
    setSelectedSize(firstAvailableSize?.size || null);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and size");
      return;
    }

    setIsDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart");
      setIsDisabled(false);
    }, 1000);
  };

  console.log(product);

  return (
    <section className="mt-17">
      <div className="max-w-7xl mx-auto bg-white rounded-xl md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex sm:justify-center flex-col-reverse max-sm:flex-row sm:flex-row gap-4">
            <div className="flex max-sm:flex-col sm:flex-col gap-3">
              {currentVariant?.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-24 cursor-pointer rounded-lg overflow-hidden border ${
                    mainImage === img ? "border-black" : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div
              onMouseMove={handleMove}
              className="sm:w-[420px] sm:h-[520px] w-full h-[500px] rounded-xl overflow-hidden"
            >
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-800 hover:scale-350"
                style={{
                  transformOrigin: `${position.x}% ${position.y}%`,
                }}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold my-3">{product.title}</h1>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-[18px] font-bold">{product.price} EGP</span>

              <span className="line-through text-[18px] text-gray-400">
                {product.oldPrice} EGP
              </span>

              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                -{discount}%
              </span>
            </div>

            <div className="mb-6">
              <p className="mb-2 font-medium">{`Color : ${selectedColor}`}</p>

              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => handleColorChange(variant.color)}
                    className={`rounded px-8 text-white border-2 transition ${
                      selectedColor === variant.color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 font-medium">
                {`Size : ${selectedSize ? selectedSize : ""}`}
              </p>

              <div className="flex gap-3 flex-wrap">
                {currentVariant?.sizes?.map((s) => {
                  const isOutOfStock = s.stock === 0;

                  return (
                    <button
                      key={s.size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`relative w-9 h-9 border text-sm transition rounded group ${
                        selectedSize === s.size
                          ? "border-black bg-black text-white"
                          : "border-gray-300"
                      } ${
                        isOutOfStock
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:border-gray-400 cursor-pointer"
                      }`}
                    >
                      <span className={isOutOfStock ? "line-through" : ""}>
                        {s.size}
                      </span>

                      {isOutOfStock && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                          Out of stock
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="flex items-center border py-1 px-3 border-gray-300 rounded">
                <button
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                >
                  <FaMinus size={10} />
                </button>

                <span className="px-4 text-[12px] lg:text-sm">{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-colors"
                >
                  <FaPlus size={10} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || isDisabled}
                className="flex-1 bg-black text-white py-1 px-4 rounded hover:opacity-70 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isDisabled}
              className="w-full bg-black text-white py-1 px-4 rounded hover:opacity-70 disabled:cursor-not-allowed"
            >
              Buy it Now
            </button>

            <div className="flex gap-4 mt-6 mb-4 items-center">
              <Badge icon={<GiAirplaneDeparture />} text="FAST SHIPPING" />
              <Badge icon={<BsHeadset />} text="24/7 SUPPORT" />
              <Badge icon={<AiOutlineReload />} text="14 DAYS RETURN" />
            </div>

            <div className="mt-6">
              <Accordion title="Shipping & Returns" icon={FiTruck}>
                <p className="text-gray-600 text-sm">
                  Delivery 3-5 Days Cairo — 5-7 Days Other Governorates
                </p>
              </Accordion>

              <Accordion title="Return policy" icon={FiRotateCcw}>
                <p className="text-gray-600 text-sm">
                  If return due to defect → free return. Customer preference →
                  shipping fees applied.
                </p>
              </Accordion>

              <Accordion title="Product Performance" icon={FiBox}>
                <ProductPerformance />
              </Accordion>
            </div>

            <div className="mt-4">
              <ShareProduct
                url={window.location.href}
                title="Check out this product!"
              />
            </div>
          </div>
        </div>
        <div className="pt-10">
          <CustomerReviews
            product={product}
            reviews={product.reviews}
            reviewsStats={product.reviewsStats}
          />
        </div>
      </div>
    </section>
  );
}
