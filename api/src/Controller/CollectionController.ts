import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "../Classes/Collection";

export class CollectionController {
    // public async getCollection(response: NextApiResponse): Promise<any>{
    //     const collectionNames = await new Collection().getAllCollectionDocumentsCount();
    //     if (!collectionNames) {
    //         response.status(404).json('error');
    //     } else {
    //         try {
    //             response.status(200).json(collectionNames);
    //         } catch (error) {
    //             response.status(500).json('error');
    //         }
    //     }
    // }


    public async getOneCollection(response: NextApiResponse, databaseName: string): Promise<any>{
        const collectionNames = await new Collection().getOneCollectionDocumentsCount(databaseName);
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

    public async addOneCollection(request:NextApiRequest, response: NextApiResponse){
        const { databaseName } = request.body;
        const { collectionName } = request.body;
        const collection = await new Collection().addNewCollection(databaseName, collectionName);
        response.status(200).json(collection);
    }

    public async deleteOneCollection(request:NextApiRequest, response: NextApiResponse) {
        const { databaseName } = request.body;
        const { collectionName } = request.body;
        const collection = await new Collection().deleteCollection(databaseName, collectionName);
        response.status(200).json(collection);
    }

}