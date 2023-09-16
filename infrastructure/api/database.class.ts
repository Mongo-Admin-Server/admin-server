import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data;
  }
  
  public async deleteDatabase (databaseName: string ) {
    const response = await axios.delete('/database', {
      data: {
        databaseName
      }
    });
    return response.data;
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