const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const FETCH_TIMEOUT = 30_000;

export async function apiFetch({ path, ...options }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  const isFormData = options.body instanceof FormData;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      signal: controller.signal,
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      throw data?.message || data?.msg || "Something went wrong";
    }

    return {
      data,
      headers: Object.fromEntries(res.headers.entries()),
    };
  } catch (err) {
    if (err.name === "AbortError") {
      throw "Request timed out";
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
