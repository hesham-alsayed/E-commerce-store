import { apiFetch } from ".";

export const getCartApi = async () => {
  const res = await apiFetch({ path: "/cart", method: "GET" });
  return res.data;
};

export const addToCartApi = async (data) => {
  const res = await apiFetch({ path: "/cart", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const updateCartItemApi = async (itemId, quantity) => {
  const res = await apiFetch({ path: `/cart/${itemId}`, method: "PATCH", body: JSON.stringify({ quantity }) });
  return res.data;
};

export const removeCartItemApi = async (itemId) => {
  const res = await apiFetch({ path: `/cart/${itemId}`, method: "DELETE" });
  return res.data;
};

export const clearCartApi = async () => {
  const res = await apiFetch({ path: "/cart", method: "DELETE" });
  return res.data;
};

export const applyCouponApi = async (code) => {
  const res = await apiFetch({ path: "/cart/apply-coupon", method: "POST", body: JSON.stringify({ code }) });
  return res.data;
};

export const removeCouponApi = async () => {
  const res = await apiFetch({ path: "/cart/remove-coupon", method: "DELETE" });
  return res.data;
};
