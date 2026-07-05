"use client";

import {
  getFinalPrice,
  isDiscountValid,
  isLightColor,
  resolveDiscount,
} from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { BsCollection } from "react-icons/bs";
import { AiOutlineExport } from "react-icons/ai";
import Link from "next/link";

export default function ProductsSection({ section }) {
  const allProducts = useMemo(() => {
    return section?.props?.products || [];
  }, [section]);

  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, 4));
  }, [allProducts]);

  const handleRemove = (id) => {
    setVisibleProducts((prev) => {
      const updated = prev.filter((p) => p._id !== id);

      const next = allProducts.find(
        (p) => p._id !== id && !updated.some((v) => v._id === p._id),
      );

      if (next) {
        updated.push(next);
      }

      return updated;
    });
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className=" text-sm md:text-2xl lg:text-3xl font-medium capitalize">
            {section?.props?.productType} products
          </h2>

          <p className="text-[16px] text-gray-500">
            collection {section?.props?.collection?.name} • with category{" "}
            {section?.props?.category?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {visibleProducts.map((product) => {
            console.log(product);

            const discount = resolveDiscount(product);
            const validDiscount = isDiscountValid(discount) ? discount : null;

            const finalPrice = getFinalPrice(product.price, validDiscount);
            const hasDiscount = Boolean(validDiscount);

            return (
              <div
                key={product._id}
                className="relative h-140 border rounded-2xl overflow-hidden bg-white transition flex flex-col"
              >
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute flex items-center justify-center hover:cursor-pointer hover:opacity-80 top-2 right-2 z-10 w-7 h-7 bg-black text-white rounded-full opacity-0 group-hover:opacity-100"
                >
                  <XIcon />
                </button>

                <div className="group/image h-120 relative bg-gray-100 overflow-hidden">
                  {hasDiscount && (
                    <div className="absolute top-0 left-0 z-20 bg-red-700 text-white text-xs px-2 py-1">
                      {discount.value}
                      {discount.type === "percentage" ? "%" : "LE"} OFF
                    </div>
                  )}

                  <img
                    src={
                      product?.variants?.[0]?.images?.[0] || "/placeholder.png"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover/image:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-3">
                    <Link
                      href={`/products?collection=${product.collection._id}`}
                      className="rounded-md text-sm py-1 hover:cursor-pointer px-5 flex items-center gap-2 bg-white text-black hover:bg-gray-200"
                    >
                      <BsCollection />
                      Shop Collection {product.collection.name}
                    </Link>
                    <Link
                      href={`/products?collection=${product.collection._id}&category=${product.category._id}`}
                      className="rounded-md text-sm py-1 hover:cursor-pointer px-5 flex items-center gap-2 bg-white text-black hover:bg-gray-200"
                    >
                      <AiOutlineExport />
                      Shop Category {product.category.name}
                    </Link>
                  </div>
                </div>

                <div className="h-25 p-2 flex flex-col justify-between">
                  <h3 className="text-xs font-semibold line-clamp-1">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">${finalPrice}</span>

                    {validDiscount && (
                      <span className="text-[10px] text-gray-400 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {product?.variants?.slice(0, 3).map((v, i) => {
                      const light = isLightColor(v.colorCode);

                      return (
                        <Button
                          key={i}
                          className="w-14 h-5 rounded-sm text-xs border"
                          style={{
                            backgroundColor: v.colorCode,
                            color: light ? "#000" : "#fff",
                          }}
                        >
                          {v.color}
                        </Button>
                      );
                    })}
                    <Link className="ml-auto" href={`/products-details/${product._id}`}>
                      <Button
                        className={
                          "ml-auto text-xs bg-white border-gray-200 hover:cursor-pointer hover:bg-gray-100  border text-black"
                        }
                      >
                        view
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
