import { api } from ".";

export const getAllPages = async () => {
  const res = await api.get("/pages");
  return res.data;
};

