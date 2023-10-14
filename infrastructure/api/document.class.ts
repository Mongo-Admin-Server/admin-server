import { axios } from "./axios.class";

class Document {
  public async getAllDocumentByCollection(database: string, collection: string, page: number, perPage: number, filter: any) {
    axios.setFilter(filter);
    const response = await axios.get(`/document/${database}/${collection}?page=${page}&perPage=${perPage}`);
    axios.deleteFilter();
    return response.data;
  }

  public async getDocument(database: string, collection: string, id: string) {
    const response = await axios.get(`/document/${database}/${collection}/${id}`);
    return response.data;
  }

  public async postDocument(database: string, collection: string, query: JSON) {
    const response = await axios.post(`/document/${database}/${collection}`, query);
    return response;
  }

  public async updateDocument(database: string, collection: string, id: string, query: JSON) {
    const response = await axios.put(`/document/${database}/${collection}/${id}`, query);
    return response;
  }

  public async deleteDocument(database: string, collection: string, id: string) {
    const response = await axios.delete(`/document/${database}/${collection}/${id}`);
    return response;
  }

  public async exportDocuments(databaseName: string, collectionName: string, fileName: string = collectionName, extension: string) {
    const response = await axios.post(`/collection/export/`,{databaseName, collectionName, fileName, extension});
    return response.data;
  }
}

export const document = new Document()
