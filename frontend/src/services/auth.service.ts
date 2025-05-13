import api from "../api/axios";

import {
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

      const response= await api.get("/auth/logout");
      return response;
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
    setUser(response.data.user);
    setToken("accessToken", response.data.accessToken);
    setToken("refreshToken", response.data.refreshToken);

    return response;
  }
  async submitAdditionalInfo(data: unknown) {
    const response = await api.post("/auth/submit-additional-info", data);
    return response;
  }
}

export default AuthService;
