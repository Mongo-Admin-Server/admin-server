import { axios } from "./axios.class";

class Collection {
  public async getCollectionsByDatabase(database: string) {
    const response = await axios.get(`/collection/${database}`);
    return response.data;
  }

  public async postCollectionByName(databaseName: string, collectionName: string) {
    const response = await axios.post(`/collection/`, { databaseName, collectionName });
    return response.data
  }
}

export const collection = new Collection()