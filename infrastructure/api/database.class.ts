import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data;
  }
}

export const database = new Database()