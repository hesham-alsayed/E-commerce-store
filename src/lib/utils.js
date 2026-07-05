import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import React from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const showToast = ({ message, type = "success" }) => {
  let icon = null;
  let style = {};

  if (type === "success") {
    icon = React.createElement(AiOutlineCheck, {
      size: 20,
      className: "text-white", 
    });
    style = {
      background: "#000", 
      color: "#fff", 
      borderRadius: "10px",
      padding: "12px 20px",
      fontWeight: "500",
    };
  } else if (type === "error") {
    icon = React.createElement(AiOutlineClose, {
      size: 20,
      className: "text-white", 
    });
    style = {
      background: "#b91c1c", 
      color: "#fff", 
      borderRadius: "10px",
      padding: "12px 20px",
      fontWeight: "500",
    };
  }

  toast(message, {
    icon,
    style,
    duration: 4000,
  });
};

export const formatNavLinks = (navLinks = []) => {
  const collectionsMap = {};

  navLinks.forEach((item) => {
    const collection = item.collection;
    const category = item.category;

    const collectionSlug = collection.slug;
    const categorySlug = category.slug;

    if (!collectionsMap[collectionSlug]) {
      collectionsMap[collectionSlug] = {
        id: collection._id || collection.id,
        name: collection.name,
        slug: collectionSlug,
        categories: {},
      };
    }

    if (!collectionsMap[collectionSlug].categories[categorySlug]) {
      collectionsMap[collectionSlug].categories[categorySlug] = {
        id: category._id || category.id,
        name: category.name,
        slug: categorySlug,
        subcategories: [],
      };
    }

    collectionsMap[collectionSlug].categories[categorySlug].subcategories.push({
      id: item._id || item.id,
      name: item.name,
      slug: item.slug,
    });
  });

  return Object.values(collectionsMap).map((col) => ({
    id: col.id,
    name: col.name,
    slug: col.slug,
    categories: Object.values(col.categories).map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      subcategories: cat.subcategories,
    })),
  }));
};

export const isDiscountValid = (discount) => {
  if (!discount) return false;

  const { isActive, value, startDate, endDate } = discount;

  if (!isActive || !value) return false;

  const now = Date.now();

  if (startDate && new Date(startDate).getTime() > now) return false;
  if (endDate && new Date(endDate).getTime() < now) return false;

  return true;
};

export const getFinalPrice = (price, discount) => {
  if (!isDiscountValid(discount)) return price;

  if (discount.type === "percentage") {
    return price - (price * discount.value) / 100;
  }

  if (discount.type === "fixed") {
    return price - discount.value;
  }

  return price;
};

export const resolveDiscount = (product) => {
  const sub = product?.subcategory?.discount;
  if (sub && isDiscountValid(sub)) {
    return { ...sub, source: "subcategory" };
  }

  const cat = product?.category?.discount;
  if (cat && isDiscountValid(cat)) {
    return { ...cat, source: "category" };
  }

  const col = product?.collection?.discount;
  if (col && isDiscountValid(col)) {
    return { ...col, source: "collection" };
  }

  return null;
};

export const statusStyle = (status) => {
  const map = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    returned: "bg-orange-100 text-orange-700",
  };

  return map?.[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
};

export const getSizeType = (size) => {
  const value = String(size).toLowerCase();

  if (["xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"].includes(value)) {
    return "Clothes Size";
  }

  if (Number(value) >= 44 && Number(value) <= 70) {
    return "Blazer Size";
  }

  if (Number(value) >= 28 && Number(value) <= 44) {
    return "Waist Size";
  }

  return "Size";
};

export const groupSizesByType = (products = []) => {
  const result = {};

  products.forEach((product) => {
    const type = product.type;

    if (!result[type]) {
      result[type] = [];
    }

    product.variants?.forEach((variant) => {
      variant.sizes?.forEach((s) => {
        const existing = result[type].find((item) => item.size === s.size);

        if (existing) {
          existing.stock += s.stock || 0;
        } else {
          result[type].push({
            size: s.size,
            stock: s.stock || 0,
          });
        }
      });
    });
  });

  return result;
};

export const isLightColor = (color) => {
  if (!color) return false;

  const hex = color.replace("#", "");

  const fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 180;
};

export const resolveStock = (item) => {
  const variants = item?.product?.variants || [];

  const variant = variants.find(
    (v) => v.color?.toLowerCase() === item.color?.toLowerCase(),
  );

  const sizeObj = variant?.sizes?.find(
    (s) => s.size?.toLowerCase() === item.size?.toLowerCase(),
  );

  return sizeObj?.stock ?? 0;
};
