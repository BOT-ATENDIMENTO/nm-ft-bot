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
  static validateToken(token) {
    return this.client.post(`/validate-token`, {
      token: token,
    });
  }
}

export default AuthService;
