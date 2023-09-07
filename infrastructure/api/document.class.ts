import { axios } from "./axios.class";

class Document {
  public async getAllDocumentByCollection(database: string, collection: string) {
    const response = await axios.get(`/document/${database}/${collection}`);
    return response.data.result;
  }

  public async deleteDocument(database: string, collection: string, id: string) {
    const response = await axios.delete(`/document/${database}/${collection}/${id}`);
    return response;
  }
}

export const document = new Document()
