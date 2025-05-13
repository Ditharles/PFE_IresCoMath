import api from "../api/axios";

class ManageRequestsService {
  async getAllRequests() {
    const response = await api.get("/requests/get-all-requests");
    console.log("users", response.data);
    return response;
  }
}

export default ManageRequestsService;
