const urlApi =
  process.env.API_BACKEND_UR === "development"
    ? "https://api.rafaeloliveira.dev.br"
    : "https://api.rafaeloliveira.dev.br";

const firstPage =
  process.env.API_BACKEND_UR === "production"
    ? "https://api.rafaeloliveira.dev.br"
    : "https://api.rafaeloliveira.dev.br";

export default { urlApi, firstPage };
