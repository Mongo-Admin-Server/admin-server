import { axios } from './axios.class';

class Auth {
  public async testInstance() {
    const response = await axios.get("/instance");
    return response.data;
  }
}

export const auth = new Auth();
