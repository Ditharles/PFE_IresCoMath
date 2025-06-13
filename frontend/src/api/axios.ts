import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getToken,
  removesTokens,
  setToken,
  removeUser,
} from "../utils/tokens.utils";

// URL de base de l'API backend
const baseUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/confirm-request",
  "/auth/resend-confirmation-email",
  "/auth/forgot-password",
  "/auth/validate-account",
  "/auth/submit-additional-info/",
];

// Interface pour les éléments dans la file d'attente
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

// Interface pour la réponse du refresh token
interface RefreshTokenResponse {
  accessToken: string;
}

// Extension de la config pour marquer les requêtes retentées
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Client axios principal
const api = axios.create({ baseURL: baseUrl });

// Client axios dédié aux requêtes de refresh token
const refreshClient = axios.create({ baseURL: baseUrl });

// Indicateur de refresh en cours
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Traitement de la file d'attente des requêtes en échec
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

// Intercepteur de requête : ajoute le token si nécessaire
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!publicRoutes.some((route) => config.url?.includes(route))) {
      const token = getToken("accessToken");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse : gestion des erreurs 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si un refresh est déjà en cours, on met en file d'attente
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
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
          throw new Error("Tokens manquants");
        }

        // Requête pour rafraîchir le token
        const response = await refreshClient.post<RefreshTokenResponse>(
          "/auth/refresh-token",
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        const newAccessToken = response.data.accessToken;
        setToken("accessToken", newAccessToken);

        // Mise à jour des headers globaux
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // Mise à jour des headers de la requête originale
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        // Traitement de la file d'attente avec le nouveau token
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        // Nettoyage des tokens et déconnexion
        removesTokens();
        removeUser();
        processQueue(refreshError, null);

        // Événement global pour gérer l'expiration de session
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("sessionExpired"));
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
