import { apiFetch } from ".";

function buildQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) query.append(key, value);
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const getAllProducts = async (params) => {
  const qs = buildQuery(params);
  const res = await apiFetch({ path: `/products/user${qs}`, method: "GET" });
  return res.data;
};

export const getOneProduct = async (id) => {
  const res = await apiFetch({ path: `/products/${id}`, method: "GET" });
  return res.data;
};
