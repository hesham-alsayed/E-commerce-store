// src/api/cartApi.js

import { api } from ".";

export const getCartApi = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const addToCartApi = async (data) => {
  const res = await api.post("/cart", data);
  return res.data;
};

export const updateCartItemApi = async (itemId, quantity) => {
  const res = await api.patch(`/cart/${itemId}`, { quantity });
  return res.data;
};
export const removeCartItemApi = async (itemId) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const res = await api.delete("/cart");
  return res.data;
};

export const applyCouponApi = async (code) => {
  const res = await api.post("/cart/apply-coupon", { code });
  return res.data;
};

export const removeCouponApi = async () => {
  const res = await api.delete("/cart/remove-coupon");
  return res.data;
};
