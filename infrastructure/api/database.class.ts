import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data.rows;
  }
}

export const database = new Database()