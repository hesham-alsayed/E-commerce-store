import { api } from ".";



export const getWishlistApi = async () => {
  const res = await api.get(`/users/wishlist`);
  return res.data;
};

export const addToWishlistApi = async (productId) => {
  const res = await api.post(`/users/wishlist`, { productId });
  return res.data;
};

export const removeFromWishlistApi = async (productId) => {
  const res = await api.delete(`/users/wishlist/${productId}`);
  return res.data;
};


export const getAddresses = async () => {
  const res = await api.get(`/users/me/addresses`);
  return res.data.data;
};

export const addAddress = async (data) => {
  const res = await api.post(`/users/me/addresses`, data);
  return res.data.data;
};

export const updateAddress = async (id, data) => {
  const res = await api.patch(`/users/me/addresses/${id}`, data);
  return res.data.data;
};

export const deleteAddress = async (id) => {
  const res = await api.delete(`/users/me/addresses/${id}`);
  return res.data.data;
};
