import { axios } from "./axios.class";

class Document {
  public async getAllDocumentByCollection(database: string, collection: string, page: number, perPage: number) {
    const response = await axios.get(`/document/${database}/${collection}?page=${page}&perPage=${perPage}`);
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
}

export const document = new Document()
