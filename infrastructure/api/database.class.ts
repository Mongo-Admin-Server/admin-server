import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data.rows;
  }
  public async deleteDatabase (databaseName: string ) {
    {
      const response = await axios.delete('/database/', {
        data: { databaseName } 
      });
      return response.data;
    } 
  }
}

export const database = new Database()