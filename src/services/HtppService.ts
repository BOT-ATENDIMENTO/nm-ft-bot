import axios, { AxiosInstance } from "axios";

class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        // Outros headers comuns podem ser definidos aqui
      },
    });
  }

  // Método para fazer solicitação POST
  async post(url: string, data: any, token?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.instance.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error.message}`);
    }
  }

  // Métodos para outras solicitações (GET, PUT, DELETE, etc.) podem ser definidos da mesma forma
}

export default HttpService;
