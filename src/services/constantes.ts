const urlApi =
  process.env.API_BACKEND_UR === "development"
    ? "https://api.rafaeloliveira.dev.br"
    : "http://localhost:9001";

const firstPage =
  process.env.API_BACKEND_UR === "production"
    ? "https://api.rafaeloliveira.dev.br"
    : "http://localhost:9001";

export default { urlApi, firstPage };
