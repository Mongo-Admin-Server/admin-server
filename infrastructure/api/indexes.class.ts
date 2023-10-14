import { axios } from "./axios.class";

class Indexes {
  public async getAllIndexesByCollection(database: string, collection: string) {
    const response = await axios.get(`/index/${database}/${collection}`);
    return response.data;
  }

  public async createIndex(databaseName: string, collectionName: string, field: string, unique: boolean) {
    const response = await axios.post('/index', {
      databaseName,
      collectionName,
      field,
      unique
    });
    return response;
  }
}

export const indexes = new Indexes();