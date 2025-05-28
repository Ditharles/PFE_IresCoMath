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

// Rafraîchissement du token en cas de 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Rejoue la requête échouée
      } catch (err) {
        return Promise.reject(err); // Token expiré ou erreur fatale
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
