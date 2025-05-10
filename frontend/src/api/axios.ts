import axios from "axios";
import {
  getToken,
  removesTokens,
  setToken,
  removeUser,
} from "../utils/tokens.utils";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Liste des routes ou méthodes qui ne nécessitent pas de token
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/confirm-request",
  "/auth/resend-confirmation-email",
  "/auth/forgot-password",
];

// Ajout du token d'accès au header de la requête si nécessaire
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
  (error) => {
    return Promise.reject(error);
  }
);

// Les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      refreshToken();
    }
    return Promise.reject(error);
  }
);

async function refreshToken() {
  try {
    const refreshToken = getToken("refreshToken");
    if (!refreshToken) throw new Error("Refresh token not found");
    const response = await api.post("/auth/refresh-token", { refreshToken });
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
