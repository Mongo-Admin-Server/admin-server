import { axios } from "./axios.class";

class Collection {
  public async getCollectionsByDatabase(database: string) {
    const response = await axios.get(`/collection/${database}`);
    return response.data;
  }
  
  public async deleteCollectionByName (databaseName: string, collectionName: string) {
      const response = await axios.delete('/collection/', {
        data: { databaseName, collectionName } 
      });
      return response.data;
  }

  public async postCollectionByName(databaseName: string, collectionName: string) {
    const response = await axios.post(`/collection`, { databaseName, collectionName });
    return response.data
  }

  public async exportCollections(databaseName: string, fileName: string = databaseName, extension: string) {
    const response = await axios.post(`/export`,{ databaseName, fileName, extension });
    return response.data;
  }

  public async importCollection(databaseName: string, fileName: string, collectionName: string) {
    const response = await axios.post(`/import`, { databaseName, fileName, collectionName });
    return response.data;
  }

  public async getAllFieldsFromCollection(databaseName: string, collectionName: string) {
    const response = await axios.get(`/field/${databaseName}/${collectionName}`);
    return response.data;
  }
}

export const collection = new Collection()