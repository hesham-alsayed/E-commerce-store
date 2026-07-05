import { api } from ".";

export const getAllProducts = async (params) => {
  try {
    const res = await api.get("/products/user", {
      params,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneProduct = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
