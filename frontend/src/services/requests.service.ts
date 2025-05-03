import api from "../api/axios";

import { requestUrl, RequestType } from "../types/request";

class RequestsService {
  async getPossibleRequests() {
    try {
      const response = await api.get("/requests/get-possible-requests");
      console.log("users", response.data);
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs:",
        error
      );
      throw error;
    }
  }

  async getRequests() {
    try {
      const response = await api.get("/requests/get-requests");
      console.log("users", response.data);
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs:",
        error
      );
      throw error;
    }
  }

  async createRequest(credentials: unknown, type: RequestType) {
    try {
      const response = await api.post(
        `/requests/${requestUrl[type]}`,
        credentials
      );
      return response;
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'inscription:", error);
      throw error;
    }
  }
}

export default RequestsService;
