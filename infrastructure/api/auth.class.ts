import { axios } from './axios.class';

class Auth {
  public async testInstance() {
    try {
      await axios.get("/instance");
    } catch (error) {
      throw error;
    }
  }
}

export const auth = new Auth();
