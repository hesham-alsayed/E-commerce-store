"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getFinalPrice, isDiscountValid, resolveDiscount } from "@/lib/utils";
import Link from "next/link";

const stockVariant = (status) => {
  switch (status) {
    case "In stock":
      return "bg-green-100 text-green-700";
    case "Out of stock":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function WishlistItem({ item, onRemove }) {
  const product = item;

  const image = product?.variants?.[0]?.images?.[0];

  const discount = resolveDiscount(product);
  const validDiscount = isDiscountValid(discount) ? discount : null;

  const finalPrice = getFinalPrice(product.price, validDiscount);
  const hasDiscount = Boolean(validDiscount);

  const getStockStatus = (product) => {
    const stock = product.stock || 0;

    if (stock === 0) return "Out of stock";
    if (stock <= 5) return "Low stock";
    return "In stock";
  };

  const stock = product.stock || 0;
  const stockStatus = getStockStatus(product);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4">
      <img src={image} alt={product.title} className="w-34 h-44 rounded-md" />

      <div className="flex-1">
        <h3 className="font-semibold capitalize  text-base line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
      </div>

      <div className="text-right min-w-22">
        <p className="font-bold text-gray-900">EGP {finalPrice.toFixed(2)}</p>

        {hasDiscount && (
          <p className="text-xs text-gray-400 line-through">
            EGP {product.price.toFixed(2)}
          </p>
        )}
      </div>

      <Badge className={stockVariant(stockStatus)}>{stockStatus}</Badge>

      {stock > 0 && stock <= 5 && (
        <p className="text-xs text-yellow-600">Only {stock} left 🔥</p>
      )}

      <div className="flex items-center gap-2">
        <Link href={`/products-details/${product._id}`}>
          <Button size="sm" variant="outline" disabled={stock === 0}>
            show Product
          </Button>
        </Link>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemove(product._id)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
