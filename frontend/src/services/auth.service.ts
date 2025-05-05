import api from "../api/axios";

import {
  getToken,
  isAuthenticated,
  removesTokens,
  removeUser,
  setToken,
  setUser,
} from "../utils/tokens.utils";

class AuthService {
  async getUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data;
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
    const response = await api.post("/auth/login", { email, password });
    const { accessToken, refreshToken, user } = response.data;
    setToken("accessToken", accessToken);
    setToken("refreshToken", refreshToken);
    setUser(user);
    return response;
  }

  async logout() {
    try {
      console.log("Déconnexion en cours");
      console.log(getToken("accessToken"));
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la déconnexion:", error);
      throw error;
    } finally {
      removesTokens();
      removeUser();
    }
  }

  async register(credentials: unknown, role: string) {
    const response = await api.post(`/auth/register/${role}`, credentials);
    return response;
  }

  async confirmRequest(token: string) {
    try {
      const response = await api.get(`/auth/confirm-request/${token}`);
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
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
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
    }
  }

  async resendConfirmationEmailWithEmail(email: string) {
    try {
      const response = await api.post("/auth/resend-confirmation-link", {
        email,
      });
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
      throw error;
    }
  }

  async confirmResetPassword(token: string) {
    try {
      const response = await api.get(`/auth/confirm-reset-password/${token}`);
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
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
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
      throw error;
    }
  }
  async verifyValidationUser(token: string) {
    try {
      const response = await api.get(`/auth/validate-account/${token}`);
      setUser(response.data.user);
      setToken("accessToken", response.data.accessToken);
      setToken("refreshToken", response.data.refreshToken);

      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
      throw error;
    }
  }
  async submitAdditionalInfo(data: any) {
    try {
      const response = await api.post("/auth/submit-additional-info", data);
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la confirmation:",
        error
      );
      throw error;
    }
  }
}

export default AuthService;
