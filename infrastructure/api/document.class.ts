import { axios } from "./axios.class";

class Document {
  public async getAllDocumentByCollection(database: string, collection: string) {
    const response = await axios.get(`/document/${database}/${collection}`);
    return response.data.result;
  }
}

export const document = new Document()
