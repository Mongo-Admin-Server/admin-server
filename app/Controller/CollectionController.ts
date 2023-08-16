import { NextApiResponse } from "next";
import { Collection } from "../Classes/Collection";

export class CollectionController {
    public async getCollection(response: NextApiResponse): Promise<any>{
        const collectionNames = await new Collection().getAllCollectionDocumentsCount();
        if (!collectionNames) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json(collectionNames);
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }


    public async getOneCollection(response: NextApiResponse, name: string): Promise<any>{
        const collectionNames = await new Collection().getOneCollectionDocumentsCount(name);
        if (!collectionNames) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json(collectionNames);
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }
}