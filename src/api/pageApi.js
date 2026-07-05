import { apiFetch } from ".";

export const getAllPages = async () => {
  const res = await apiFetch({ path: "/pages", method: "GET" });
  return res.data;
};
