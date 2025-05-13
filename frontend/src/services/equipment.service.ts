import api from "../api/axios";
import { EquipmentType } from "../types/request";

class EquipmentService {
  async getAllCategories() {
    const response = await api.get("/equipments/get-all-categories");
    return response;
  }

  async getCategoriesByType(type: EquipmentType) {
    const response = await api.get(
      `/equipments/get-categories-by-type/${type}`
    );
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
