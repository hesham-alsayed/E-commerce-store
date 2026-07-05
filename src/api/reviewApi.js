import { apiFetch } from ".";

export const getMyReviewsApi = async () => {
  const res = await apiFetch({ path: "/reviews/me", method: "GET" });
  return res.data;
};

export const createReviewApi = async (data) => {
  const res = await apiFetch({ path: "/reviews", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const updateReviewApi = async (id, data) => {
  const res = await apiFetch({ path: `/reviews/${id}`, method: "PATCH", body: JSON.stringify(data) });
  return res.data;
};

export const deleteReviewApi = async (id) => {
  const res = await apiFetch({ path: `/reviews/${id}`, method: "DELETE" });
  return res.data;
};
