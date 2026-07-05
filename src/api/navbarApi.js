import { api } from ".";

export const getNavLinks = async () => {
  try {
    const res = await api.get("/subcategories/nav-links");
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return [];
  }
};

