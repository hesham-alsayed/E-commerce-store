import { apiFetch } from ".";

export const login = async (data) => {
  const res = await apiFetch({ path: "/authentication/auth-login", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const getMe = async () => {
  const res = await apiFetch({ path: "/users/me", method: "GET" });
  return res.data;
};

export const logout = async () => {
  await apiFetch({ path: "/authentication/logout", method: "POST", body: "{}" });
};

export const signup = async (data) => {
  const res = await apiFetch({ path: "/authentication/auth-signup", method: "POST", body: JSON.stringify(data) });
  return res.data;
};

export const verifyEmailCode = async (email, code) => {
  const res = await apiFetch({ path: "/authentication/auth-verify-email-code", method: "POST", body: JSON.stringify({ email, code }) });
  return res.data;
};

export const reSendEmailCode = async (email) => {
  const res = await apiFetch({ path: "/authentication/auth-send-email-code", method: "POST", body: JSON.stringify({ email }) });
  return res.data;
};

export const changePassword = async (data) => {
  const res = await apiFetch({ path: "/authentication/auth-update-password", method: "PATCH", body: JSON.stringify(data) });
  return res.data;
};

export const updateMe = async (data) => {
  const res = await apiFetch({ path: "/users/update-me", method: "PATCH", body: JSON.stringify(data) });
  return res.data;
};

export const updateAvatar = async (formData) => {
  const res = await apiFetch({ path: "/users/me", method: "PATCH", body: formData });
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await apiFetch({ path: "/authentication/forgot-password", method: "POST", body: JSON.stringify({ email }) });
  return res.data;
};

export const resetPassword = async (token, password, passwordConfirm) => {
  const res = await apiFetch({ path: `/authentication/reset-password/${token}`, method: "PATCH", body: JSON.stringify({ password, passwordConfirm }) });
  return res.data;
};
