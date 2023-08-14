import { axios } from "./axios.class";

class Document {
  public async getAllDocumentByCollection(collection: string) {
    const response = await axios.get(`/document/${collection}`);
    return response.data;
  }
}

export const document = new Document()
