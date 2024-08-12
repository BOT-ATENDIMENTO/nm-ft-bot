import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("token");

class HttpServiceFluxos {
  private instance: AxiosInstance;
  private token: string | null;

  constructor(baseURL: string) {
    this.token = localStorage.getItem("token"); // Obter o token do localStorage

    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : "", // Incluir token se existir
      },
    });
  }

  // Método para fazer solicitação POST
  async post(url?: string, data?: any, token?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        console.log("token2", token);
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.instance.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error.message}`);
    }
  }

  // Métodos para outras solicitações (GET, PUT, DELETE, etc.) podem ser definidos da mesma forma
  async get(url: string, token?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.instance.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error getting data: ${error.message}`);
    }
  }

  updateToken(newToken: string) {
    this.token = newToken;
    this.instance.defaults.headers.Authorization = `Bearer ${this.token}`;
  }
}

export default HttpServiceFluxos;
