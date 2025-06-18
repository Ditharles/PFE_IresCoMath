import api from "../api/axios";
import { getBrowserInfo } from "../utils/browser.utils";
import {
  removesTokens,
  removeUser,
  setToken,
  setUser,
  getToken,
} from "../utils/tokens.utils";
import { ChangePasswordRequest } from "../types/auth";

class AuthService {
  private triggerSessionExpired() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("sessionExpired"));
    }
  }
  async getUser() {
    try {
      const response = await api.get("/auth/me");
      return response;
    } catch (error) {
      removesTokens();
      removeUser();
      this.triggerSessionExpired();
      console.error(
        "Une erreur s'est produite lors de la récupération de l'utilisateur:",
        error
      );
      throw error;
    }
  }

  async login(email: string, password: string) {
    removesTokens();
    removeUser();

    console.log("Connexion en cours");
    try {
      const browserInfo = getBrowserInfo();
      const response = await api.post("/auth/login", {
        email,
        password,
        browserInfo,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Vérification de la présence des tokens
      if (!accessToken || !refreshToken) {
        throw new Error("Tokens manquants dans la réponse");
      }

      // Stockage des tokens
      setToken("accessToken", accessToken);
      setToken("refreshToken", refreshToken);
      setUser(user);
      // Vérification que les tokens ont été correctement stockés
      const storedAccessToken = getToken("accessToken");
      const storedRefreshToken = getToken("refreshToken");

      if (!storedAccessToken || !storedRefreshToken || !user) {
        throw new Error("Échec du stockage des tokens");
      }

      console.log("Connexion réussie");

      return response;
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      removesTokens();
      removeUser();
      this.triggerSessionExpired();

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
      removesTokens();
      removeUser();
      this.triggerSessionExpired();
      console.error("Une erreur s'est produite lors de la déconnexion:", error);
      throw error;
    } finally {
      removesTokens();
      removeUser();
    }
  }

  async register(credentials: Record<string, unknown>, role: string) {
    try {
      const browserInfo = getBrowserInfo();
      const response = await api.post(`/auth/register/${role}`, {
        ...credentials,
        browserInfo,
      });
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async confirmRequest(token: string) {
    try {
      const response = await api.get(`/auth/confirm-request/${token}`);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async resendConfirmationEmail(token: string) {
    try {
      const response = await api.get("/auth/resend-confirmation-link", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async resendConfirmationEmailWithEmail(email: string) {
    try {
      const response = await api.post("/auth/resend-confirmation-link", {
        email,
      });
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async confirmResetPassword(token: string) {
    try {
      const response = await api.get(`/auth/confirm-reset-password/${token}`);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async verifyValidationUser(token: string) {
    try {
      const response = await api.get(`/auth/validate-account/${token}`);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async updateUser(data: unknown) {
    try {
      const response = await api.post("/users/update-user", data);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async updatePassword(data: ChangePasswordRequest) {
    try {
      const response = await api.post("/auth/change-password", data);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async submitAdditionalInfo(data: unknown, tempToken: string) {
    try {
      const response = await api.post(
        `/auth/submit-additional-info/:${tempToken}`,
        data,
        {}
      );
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      throw error;
    }
  }

  async getUserSessions() {
    try {
      const response = await api.get("/auth/sessions");
      return response.data.sessions;
    } catch (error) {
      this.triggerSessionExpired();
      console.error("Erreur lors de la récupération des sessions:", error);
      throw error;
    }
  }

  async logoutSession(sessionId: string) {
    try {
      const response = await api.delete(`/auth/sessions/${sessionId}`);
      return response;
    } catch (error) {
      this.triggerSessionExpired();
      console.error("Erreur lors de la déconnexion de la session:", error);
      throw error;
    }
  }
}

export default AuthService;
