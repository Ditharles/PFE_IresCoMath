import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getToken,
  removesTokens,
  setToken,
  removeUser,
} from "../utils/tokens.utils";

const baseUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";
// Interface pour gérer la file d'attente
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}
console.log(baseUrl);
// Client principal avec intercepteurs
const api = axios.create({
  baseURL: baseUrl,
});

// Client sans intercepteurs pour le refresh
const refreshClient = axios.create({
  baseURL: baseUrl,
});

// Routes publiques (ne nécessitent pas de token)
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/confirm-request",
  "/auth/resend-confirmation-email",
  "/auth/forgot-password",
  "/auth/validate-account",
  "/auth/submit-additional-info",
];

// Variable pour suivre l'état du rafraîchissement
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Ajout automatique du token dans les requêtes privées
api.interceptors.request.use(
  (config) => {
    if (!publicRoutes.some((route) => config.url?.includes(route))) {
      const token = getToken("accessToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse pour gérer le rafraîchissement automatique des tokens
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(api(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = getToken("refreshToken");
        const accessToken = getToken("accessToken");
        if (!refreshToken || !accessToken) {
          throw new Error("Pas de refresh token ou access token");
        }

        const response = await refreshClient.post("/auth/refresh-token", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        });

        if (response.status === 200) {
          const { accessToken: newAccessToken } = response.data;
          setToken("accessToken", newAccessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          processQueue(null, newAccessToken);

          return api(originalRequest);
        }
      } catch (refreshError) {
        removesTokens();
        removeUser();
        processQueue(refreshError, null);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
