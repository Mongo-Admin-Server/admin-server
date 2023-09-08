import { axios } from "./axios.class";

class Database {
  public async getAllDatabase() {
    const response = await axios.get('/database');
    return response.data.rows;
  }

  public async createDB(databaseName: string, collectionName: string) {
    try {
      const response = await axios.post("/database", {
        databaseName,
        collectionName,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la base de données : ", error);
      return error;
    }
  }
}

export const database = new Database()