import api from "../api/axios";
import { Role } from "../types/common";

export class ManageUserService {
  async getWaitingUsers() {
    return api.get("/validate/get-waiting-list");
  }

  async getUsers() {
    return api.get("/users/get-users");
  }

  async getUser(id: string) {
    return api.get(`/users/get-user/${id}`);
  }

  async acceptUser(
    request_id: string,
    request_role: Role,
    validate: boolean,
    rejected_reason?: string
  ) {
    return api.post("/validate/validate-request", {
      request_id,
      request_role,
      validate,
      rejected_reason,
    });
  }

  async getRequestInfo(id: string, role: Role) {
    return api.get(
      `/validate/get-request-info?user_id=${id}&user_role=${role}`
    );
  }

  async deleteUser(id: string, password: string) {
    return api.post("/users/delete-user", { id, password });
  }
}
