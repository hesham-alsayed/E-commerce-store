"use client";

import { Button } from "@/components/ui/button";
import { Star, Pencil, Trash2, Calendar } from "lucide-react";
import Link from "next/link";

export default function ReviewCard({ review, onEdit, onDelete }) {
  const { product, rating, comment, createdAt } = review;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32 flex-shrink-0">
        <img
          src={product?.variants?.[0]?.images?.[0]}
          alt={product?.title}
          className="w-full h-40 sm:h-28 object-cover rounded-lg"
        />

        <p className="text-sm font-medium mt-2 line-clamp-2">
          {product?.title}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  className={`w-4 h-4 ${
                    rating >= num
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(review)}
                className="text-gray-400 hover:text-black"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDelete(review)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 leading-relaxed break-words line-clamp-3">
            "{comment}"
          </p>
          <Link href={`/products-details/${review.product._id}`}>
            <Button
              className={
                " py-1 mt-3 border border-gray-200 hover:cursor-pointer hover:bg-gray-50 bg-white  capitalize text-black"
              }
            >
              view product
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 border-t pt-2">
          <Calendar className="w-3 h-3" />
          <span className="truncate">
            Reviewed on {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
