import { api } from ".";

export const getMyReviewsApi = async () => {
  const res = await api.get("/reviews/me");

  return res.data;
};

export const createReviewApi = async (data) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const updateReviewApi = async (id, data) => {
  const res = await api.patch(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReviewApi = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};
