import { NextApiResponse } from "next";
import { Instance } from "../Classes/Instance";

export class CollectionController {
    public async getCollection(response: NextApiResponse) {
        const instance = await new Instance().connection();
        if (!instance) {
            response.status(404).json('error');
        } else {
            try {
                const collections = await instance.db('marketplace').listCollections().toArray();
                const collectionNames = collections.map(collection => collection.name);
                response.status(200).json(collectionNames);
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }
}