import constantes from "./constantes";
import HttpService from "./HtppService";

class AuthService {
  static client = new HttpService(constantes.urlApi);

  static login(email, password) {
    return this.client.post(`/login`, {
      email: email,
      password: password,
    });
  }
  static files(token, type) {
    return this.client.post(`/files/get-file-config/${token}`, {
      type: type,
    });
  }
  static validateToken(token, user) {
    return this.client.post(`/validate-token`, {
      token: token,
      user: user,
    });
  }
  static register(data) {
    return this.client.post("/users/create", {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });
  }
  static updateFileConfig(token, data) {
    return this.client.post(`/files/update-file-config/${token}`, {
      data: data,
    });
  }
}

export default AuthService;
