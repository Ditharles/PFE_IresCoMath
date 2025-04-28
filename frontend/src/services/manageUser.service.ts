import api from "../api/axios";
import { Role } from "../types/common";
export class ManageUserService {
  async getWaitingUsers() {
    try {
      const response = await api.get("/validate/get-waiting-list");
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs en attente:",
        error
      );
      throw error;
    }
  }

  async getUsers() {
    try {
      const response = await api.get("/users/get-users");
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

  async acceptUser(
    request_id: string,
    request_role: Role,
    validate: boolean,
    rejected_reason?: string
  ) {
    try {
      const response = await api.post("/validate/validate-request", {
        request_id,
        request_role,
        validate,
        rejected_reason,
      });
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs:",
        error
      );
      throw error;
    }
  }

  async getRequestInfo(id: string, role: Role) {
    try {
      const response = await api.get(
        `/validate/get-request-info?user_id=${id}&role=${role}`
      );
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs:",
        error
      );
      throw error;
    }
  }
  async deleteUser(id: string, password: string) {
    try {
      const response = await api.post("/users/delete-user", { id });
      return response;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs:",
        error
      );
      throw error;
    }
  }
}
