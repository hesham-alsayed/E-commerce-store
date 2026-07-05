import { apiFetch } from ".";

export const getWishlistApi = async () => {
  const res = await apiFetch({ path: "/users/wishlist", method: "GET" });
  return res.data;
};

export const addToWishlistApi = async (productId) => {
  const res = await apiFetch({ path: "/users/wishlist", method: "POST", body: JSON.stringify({ productId }) });
  return res.data;
};

export const removeFromWishlistApi = async (productId) => {
  const res = await apiFetch({ path: `/users/wishlist/${productId}`, method: "DELETE" });
  return res.data;
};

export const getAddresses = async () => {
  const res = await apiFetch({ path: "/users/me/addresses", method: "GET" });
  return res.data;
};

export const addAddress = async (data) => {
  const res = await apiFetch({ path: "/users/me/addresses", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const updateAddress = async (id, data) => {
  const res = await apiFetch({ path: `/users/me/addresses/${id}`, method: "PATCH", body: JSON.stringify(data) });
  return res.data;
};

export const deleteAddress = async (id) => {
  const res = await apiFetch({ path: `/users/me/addresses/${id}`, method: "DELETE" });
  return res.data;
};
