import api from "../api/axios";
import { requestUrl, RequestType } from "../types/request";

class RequestsService {
  async getPossibleRequests() {
    const response = await api.get("/requests/get-possible-requests");
    return response;
  }

  async getRequests() {
    const response = await api.get("/requests/get-requests");
    console.log("users", response.data);
    return response;
  }

  async getRequestDetails(id: string) {
    const response = await api.get(`/requests/get-request/${id}`);
    return response;
  }
  async createRequest(credentials: unknown, type: RequestType) {
    return api.post(`/requests/${requestUrl[type]}`, credentials);
  }
  async deleteRequest(id: string) {
    return api.delete(`/requests/${id}`);
  }
  async rejectRequest(id: string, rejectReason: string) {
    return api.post(`/requests/reject-request/${id}`, {
      isApproved: false,
      rejectReason,
    });
  }

  async approveRequest(id: string, rejectReason?: string) {
    return api.post(`/requests/approve-request/${id}`, {
      isApproved: true,
      rejectReason,
    });
  }
}

export default RequestsService;
