import api from "../api/axios";
import { Role } from "../types/common";

export class ManageUserService {
  async getWaitingUsers() {
    return await api.get("/validate/get-waiting-list");
  }

  async getUsers() {
    return await api.get("/users/get-users");
  }

  async getUser(id: string) {
    return await api.get(`/users/get-user/${id}`);
  }

  async acceptUser(
    request_id: string,
    request_role: Role,
    validate: boolean,
    rejected_reason?: string
  ) {
    return await api.post("/validate/validate-request", {
      request_id,
      request_role,
      validate,
      rejected_reason,
    });
  }
  async getRequestInfo(id: string, role: Role) {
    return await api.get(
      `/validate/get-request-info?user_id=${id}&user_role=${role}`
    );
  }
  async getStudents(supervisorId: string) {
    try {
      const response = await api.get(`/users/get-students/${supervisorId}`);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants:", error);
      throw error;
    }
  }
  async desactivate(id: string) {
    return await api.post(`/users/desactivate/${id}`);
  }

  async reactivate(id: string) {
    return await api.post(`/users/reactivate/${id}`);
  }
  async delete(id: string) {
    return await api.delete(`/users/${id}`);
  }
  async updateUser(id: string, credentials: unknown) {
    return await api.post(`/users/update-user/${id}`, credentials);
  }
}
