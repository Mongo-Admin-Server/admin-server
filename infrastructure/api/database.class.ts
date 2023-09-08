import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data.rows;
  }

  public async postDatabase(databaseName: string, collectionName: string) {
    const response = await axios.post('/database', {
      databaseName,
      collectionName
    });
    return response.data;
  }
}

export const database = new Database()