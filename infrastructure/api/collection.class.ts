import { axios } from "./axios.class";

class Collection {
  public async getCollectionsByDatabase(database: string) {
    const response = await axios.get(`/collection/${database}`);
    return response.data;
  }
  public async deleteCollectionByName (collectionName: string) {
    try {
      const response = await axios.delete(`/collection/${collectionName}`);
      if (response.status === 200) {
        return "Collection supprimé avec succès"
      } else{
        throw new Error("erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur suppression", error);
      throw error;
    }
  }
}

export const collection = new Collection()