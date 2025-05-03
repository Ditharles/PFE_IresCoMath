import api from "../api/axios";

class ManageRequestsService {
   async getAllRequests() {
    try {
      const response = await api.get("/requests/get-all-requests");
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
}

export default ManageRequestsService