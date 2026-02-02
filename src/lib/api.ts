/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // required for refresh-token cookies
});

// ----------------------------
// REQUEST INTERCEPTOR
// ----------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ----------------------------
// RESPONSE INTERCEPTOR
// ----------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    // 🚫 Do NOT run refresh logic for auth endpoints
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        // Save new token
        localStorage.setItem("authToken", data.token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch {
        // ❗ NO page reload, NO hard redirect
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
