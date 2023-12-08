import api from "../../Api";

export default class AuthApi {
  static async login(email, password) {
    return await api.post("/login", {
      email: email,
      password: password,
    });
  }
  static async register(body) {
    return await api.post("/register", body);
  }
  static async getMe() {
    return await api.get("/author");
  }
}
