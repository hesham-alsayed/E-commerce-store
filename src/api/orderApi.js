import { api } from ".";

export const createOrderApi = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const capturePaypalApi = async (paypalOrderId) => {
  const res = await api.post("/paypal/capture", {
    paypalOrderId,
  });

  return res.data;
};

export const cancelPaymentApi = async (paypalOrderId) => {
  const res = await api.patch(`/paypal/cancel?token=${paypalOrderId}`);
  return res.data;
};

export const getMyOrdersApi = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

export const getOrderApi = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const getOrderByNumberApi = async (orderNumber, email) => {
  const res = await api.get(`/orders/track/${orderNumber}`, {
    params: { email },
  });

  return res.data;
};

export const getUserStats = async () => {
  const res = await api.get("/orders/user-stats");
  return res.data;
};
