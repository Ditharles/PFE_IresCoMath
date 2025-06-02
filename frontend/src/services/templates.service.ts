import api from "../api/axios";

class TemplateService {
  async getTemplates() {
    const response = await api.get("/templates");
    return response;
  }

  async getTemplate(id: string) {
    const response = await api.get(`/templates/${id}`);
    return response;
  }
  async createTemplate(credentials: Record<string, unknown>) {
    const response = await api.post("/templates/submit", credentials);
    return response;
  }

  async upsertTemplate(credentials: Record<string, unknown>) {
    const updatedCredentials = { ...credentials, upsert: true };
    const response = await api.post("/templates/submit", updatedCredentials);
    return response;
  }
  async verifyTemplate(credentials: unknown) {
    const response = await api.post("/templates/verify", credentials);
    return response;
  }

  async deleteTemplate(id: string) {
    const response = await api.delete(`/templates/${id}`);
    return response;
  }

  async updateTemplate(id: string, credentials: unknown) {
    const response = await api.put(`/templates/${id}`, credentials);
    return response;
  }

  async sendSignForm(requestId: string, url: string) {
    const response = await api.post(`/templates/${requestId}/sign-form`, {
      url,
    });
    return response;
  }
}

export default TemplateService;
