import { apiFetch } from ".";

export const getNavLinks = async () => {
  const res = await apiFetch({ path: "/subcategories/nav-links", method: "GET" });
  return res.data;
};
