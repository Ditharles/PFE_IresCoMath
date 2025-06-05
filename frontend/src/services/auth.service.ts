import api from "../api/axios";
import { getBrowserInfo } from "../utils/browser.utils";
import {
  isAuthenticated,
  removesTokens,
  removeUser,
  setToken,
  setUser,
  getToken,
} from "../utils/tokens.utils";
import { ChangePasswordRequest } from "../types/auth";

class AuthService {
  async getUser() {
    try {
      const response = await api.get("/auth/me");
      return response;
    } catch (error) {
      removesTokens();
      removeUser();
      console.error(
        "Une erreur s'est produite lors de la récupération de l'utilisateur:",
        error
      );
      throw error;
    }
  }

  async login(email: string, password: string) {
    if (isAuthenticated()) {
      return;
    }
    console.log("Connexion en cours");
    try {
      const browserInfo = getBrowserInfo();
      const response = await api.post("/auth/login", {
        email,
        password,
        browserInfo,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data;

        // Vérification de la présence des tokens
        if (!accessToken || !refreshToken) {
          throw new Error("Tokens manquants dans la réponse");
        }

        // Stockage des tokens
        await setToken("accessToken", accessToken);
        await setToken("refreshToken", refreshToken);
        await setUser(user);

        // Vérification que les tokens ont été correctement stockés
        const storedAccessToken = getToken("accessToken");
        const storedRefreshToken = getToken("refreshToken");

        if (!storedAccessToken || !storedRefreshToken) {
          throw new Error("Échec du stockage des tokens");
        }

        console.log("Connexion réussie");
      }
      return response;
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      removesTokens();
      removeUser();

      // Si l'erreur contient un type spécifique, on la propage
      if (error.response?.data?.type) {
        throw {
          message: error.response.data.message,
          type: error.response.data.type,
        };
      }

      throw error;
    }
  }

  async logout() {
    try {
      console.log("Déconnexion en cours");
      const response = await api.get("/auth/logout");
      return response;
    } catch (error) {
      console.error("Une erreur s'est produite lors de la déconnexion:", error);
      throw error;
    } finally {
      removesTokens();
      removeUser();
    }
  }

  async register(credentials: Record<string, unknown>, role: string) {
    const browserInfo = getBrowserInfo();
    const response = await api.post(`/auth/register/${role}`, {
      ...credentials,
      browserInfo,
    });
    return response;
  }

  async confirmRequest(token: string) {
    const response = await api.get(`/auth/confirm-request/${token}`);
    return response;
  }

  async resendConfirmationEmail(token: string) {
    const response = await api.get("/auth/resend-confirmation-link", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  async resendConfirmationEmailWithEmail(email: string) {
    const response = await api.post("/auth/resend-confirmation-link", {
      email,
    });
    return response;
  }

  async forgotPassword(email: string) {
    const response = await api.post("/auth/forgot-password", { email });
    return response;
  }

  async confirmResetPassword(token: string) {
    const response = await api.get(`/auth/confirm-reset-password/${token}`);
    return response;
  }

  async resetPassword(token: string, password: string) {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response;
  }

  async verifyValidationUser(token: string) {
    const response = await api.get(`/auth/validate-account/${token}`);

    return response;
  }

  async updatePassword(data: ChangePasswordRequest) {
    const response = await api.post("/auth/change-password", data);
    return response;
  }

  async submitAdditionalInfo(data: unknown, tempToken: string) {
    const response = await api.post(
      `/auth/submit-additional-info/:${tempToken}`,
      data,
      {}
    );
    if (response.data.accessToken && response.data.refreshToken) {
      setToken("accessToken", response.data.accessToken);
      setToken("refreshToken", response.data.refreshToken);
    }
    return response;
  }

  async getUserSessions() {
    try {
      const response = await api.get("/auth/sessions");
      return response.data.sessions;
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions:", error);
      throw error;
    }
  }

  async logoutSession(sessionId: string) {
    try {
      const response = await api.delete(`/auth/sessions/${sessionId}`);
      return response;
    } catch (error) {
      console.error("Erreur lors de la déconnexion de la session:", error);
      throw error;
    }
  }
}

export default AuthService;
