import api from "../api/axios";

class EquipmentService {
  async getAllCategories() {
    const response = await api.get("/equipments/categories");
    return response;
  }

  async getAllEquipments() {
    const response = await api.get("/equipments");
    return response;
  }
  async getCategory(id: string) {
    const response = await api.get(`/equipments/category/${id}`);
    return response;
  }

  async deleteCategory(id: string) {
    const response = await api.delete(`/equipments/delete-category/${id}`);
    return response;
  }

  async editCategory(id: string, credentials: unknown) {
    return await api.post(`/equipments/edit-category/${id}`, credentials);
  }

  async addCategory(credentials: unknown) {
    return await api.post(`/equipments/add-category`, credentials);
  }

  async deleteEquipment(id: string) {
    const response = await api.delete(`/equipments/delete-equipment/${id}`);
    return response;
  }

  async editEquipment(id: string, credentials: unknown) {
    return await api.post(`/equipments/edit-equipment/${id}`, credentials);
  }

  async addEquipment(credentials: unknown) {
    return await api.post(`/equipments/add-equipment`, credentials);
  }

  async getEquipment(id: string) {
    const response = await api.get(`/equipments/${id}`);
    return response;
  }
  async getEquipmentsByCategory(categoryId: string) {
    const response = await api.get(
      `/equipments/get-equipments-by-category/${categoryId}`
    );
    return response;
  }
}

export default EquipmentService;
