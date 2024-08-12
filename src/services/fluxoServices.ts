import constantes from "./constantes";
import HttpServiceFluxos from "./HttpServicesFluxos";

class botService {
  static client = new HttpServiceFluxos(constantes.urlApi);

  static findAll() {
    return this.client.post(`/bots/findAll`);
  }

  static createBot(data) {
    return this.client.post(`/bots/create`, data);
  }

  static deleteBot(id) {
    return this.client.post(`/bots/delete`, {
      id: id,
    });
  }

  static updateBot(data) {
    return this.client.post(`/bots/update`, {
      id: data.id,
      name: data.name,
      description: data.description,
      token: data.token,
    });
  }
}

export default botService;
