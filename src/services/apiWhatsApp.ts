import axios from "axios";

export const apiWhatsApp = axios.create({
  headers: {
    "x-api-key": "api.rafaeloliveira.dev.br",
  },
  baseURL: `${process.env.API_BACKEND_URL}`,
});
