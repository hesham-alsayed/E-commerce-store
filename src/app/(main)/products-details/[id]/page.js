"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import ProductImages from "@/components/productDetails/ProductImages";
import ProductInfo from "@/components/productDetails/ProductInfo";
import { fetchProductById, clearProduct } from "@/lib/features/productsSlice";
import ProductDetailsSkeleton from "@/skeleton/ProductDetailsSkeleton";
import CustomerReviews from "@/components/CustomerReviews";

export default function ProductDetailsPage() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.products);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  console.log(product);

  useEffect(() => {
    const check = () => {
      if (!product?.variants?.length) return;

      const first = product.variants[0];
      const size = first?.sizes?.find((s) => s.stock > 0);

      setSelectedColor(first.color);
      setSelectedSize(size?.size || null);
      setMainImage(first?.images?.[0]);
    };

    check();
  }, [product]);

  const currentVariant = useMemo(() => {
    return product?.variants?.find((v) => v.color === selectedColor);
  }, [product, selectedColor]);

  if (error && !product) {
    return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;
  }

  if (!product || loading) return <ProductDetailsSkeleton />;

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  const handleColorChange = (color) => {
    const variant = product.variants.find((v) => v.color === color);

    setSelectedColor(color);
    setMainImage(variant?.images?.[0]);
    setSelectedSize(variant?.sizes?.find((s) => s.stock > 0)?.size || null);
  };

  return (
    <section className="mt-17 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-3 sm:p-4 overflow-hidden">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {}
          <div className="lg:col-span-7">
            <ProductImages
              currentVariant={currentVariant}
              mainImage={mainImage}
              setMainImage={setMainImage}
              handleMove={handleMove}
              position={position}
              product={product}
            />
          </div>

          {}
          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              discount={discount}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              setSelectedSize={setSelectedSize}
              handleColorChange={handleColorChange}
              isDisabled={isDisabled}
              currentVariant={currentVariant}
              setIsDisabled={setIsDisabled}
            />
          </div>
        </div>
        {}
        <div className="pt-10">
          <CustomerReviews
            reviewsStats={product.reviewsStats}
            reviews={product.reviews}
            product={product}
          />
        </div>
      </div>
    </section>
  );
}
