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

  public async postUser(connection_url: string) {
    const response = await axios.post('/user', { connection_url})
    return response.data
  }
}

export const auth = new Auth();