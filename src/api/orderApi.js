import { apiFetch } from ".";

export const createOrderApi = async (data) => {
  const res = await apiFetch({ path: "/orders", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const capturePaypalApi = async (paypalOrderId) => {
  const res = await apiFetch({ path: "/paypal/capture", method: "POST", body: JSON.stringify({ paypalOrderId }) });
  return res.data;
};

export const cancelPaymentApi = async (paypalOrderId) => {
  const res = await apiFetch({ path: `/paypal/cancel?token=${paypalOrderId}`, method: "PATCH" });
  return res.data;
};

export const getMyOrdersApi = async () => {
  const res = await apiFetch({ path: "/orders/my-orders", method: "GET" });
  return res.data;
};

export const getOrderApi = async (id) => {
  const res = await apiFetch({ path: `/orders/${id}`, method: "GET" });
  return res.data;
};

export const getOrderByNumberApi = async (orderNumber, email) => {
  const res = await apiFetch({ path: `/orders/track/${orderNumber}?email=${encodeURIComponent(email)}`, method: "GET" });
  return res.data;
};

export const getUserStats = async () => {
  const res = await apiFetch({ path: "/orders/user-stats", method: "GET" });
  return res.data;
};
