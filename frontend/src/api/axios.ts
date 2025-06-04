import axios from "axios";
import {
  getToken,
  removesTokens,
  setToken,
  removeUser,
} from "../utils/tokens.utils";

// Client principal avec intercepteurs
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Client sans intercepteurs pour le refresh
const refreshClient = axios.create({
  baseURL: "http://localhost:8000",
});

// Routes publiques (ne nécessitent pas de token)
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/confirm-request",
  "/auth/resend-confirmation-email",
  "/auth/forgot-password",
  "/auth/validate-account",
  "/auth/submit-additional-info",
];

// Ajout automatique du token dans les requêtes privées
api.interceptors.request.use(
  (config) => {
    if (!publicRoutes.some((route) => config.url?.includes(route))) {
      const token = getToken("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variable pour suivre l'état du rafraîchissement
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Interface pour gérer la file d'attente
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

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

// Intercepteur de réponse pour gérer le rafraîchissement automatique des tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 et que nous n'avons pas déjà tenté de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si le rafraîchissement du token est déjà en cours, mettons les requêtes échouées dans la file d'attente
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = getToken("refreshToken");
        if (!refreshToken) {
          throw new Error("Pas de refresh token");
        }

        // Appel à l'API pour rafraîchir le token
        const response = await refreshClient.post("/auth/refresh-token", null, {
          headers: {
            Authorization: `Bearer ${getToken("accessToken")}`,
            refreshtoken: refreshToken,
          },
        });

        if (response.status === 200) {
          const { accessToken } = response.data;
          setToken("accessToken", accessToken);

          // Mise à jour du header de la requête originale
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Traiter la file d'attente et envoyer les requêtes échouées
          processQueue(null, accessToken);

          return api(originalRequest);
        }
      } catch (refreshError) {
        // En cas d'échec du rafraîchissement, déconnexion
        removesTokens();
        removeUser();
        window.location.href = "/login";
        processQueue(refreshError, null); // Traiter les erreurs dans la file
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Fonction de rafraîchissement de token
async function refreshToken(): Promise<string> {
  try {
    console.log("Essai lors de la tentative de rafraîchissement");

    const refreshToken = getToken("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not found");

    const response = await refreshClient.post(
      "/auth/refresh-token",
      {},
      {
        headers: {
          refreshToken: refreshToken,
        },
      }
    );

    const { accessToken } = response.data;
    setToken("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    removesTokens();
    removeUser();
    console.error(
      "Une erreur s'est produite lors du rafraîchissement du token:",
      error
    );
    throw error;
  }
}

export default api;
