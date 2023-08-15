import { axios } from "./axios.class";

class Auth {
  public async login(username: string, password: string) {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  }

  public async logout() {
    await axios.post("/auth/logout");
  }
}

export const auth = new Auth();