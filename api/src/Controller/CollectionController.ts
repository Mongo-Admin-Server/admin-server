import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "../Classes/Collection";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { RequestCustomCollection } from "@/domain/entities/collection-types";

export class CollectionController {
    
    public async getOneCollection(response: NextApiResponse, request: RequestCustomCollection): Promise<any>{
        try {
            const { databaseName } = request.query;
            const { connection_url } = request.headers;
            const collectionNames = await new Collection().getOneCollectionDocumentsCount(databaseName, connection_url);
            if (!collectionNames)
                response.status(404).json('error');
            response.status(200).json(collectionNames);
        } catch (error) {
            response.status(500).json('error');
        }
        
    }

    public async addOneCollection(request:RequestCustomHeaders, response: NextApiResponse){
        try{
            const { databaseName, collectionName } = request.body;
            const { connection_url } = request.headers
            const added = await new Collection().addNewCollection(databaseName, collectionName, connection_url);

            if(added === true)
                response.status(200).json(added);
            else
                response.status(added.code).json(added.json)
        }catch(error){
            response.status(500).json('error');
        }

    }

    public async deleteOneCollection(request:RequestCustomHeaders, response: NextApiResponse) {
        try {
            const { databaseName, collectionName } = request.body;
            const { connection_url } = request.headers;
            const deleted = await new Collection().deleteCollection(databaseName, collectionName, connection_url);
            if (!deleted) 
                response.status(400).json('error');
            response.status(200).json(deleted);
        } catch (error) {
            response.status(500).json('error');
        }
    }

    public async exportCollectionData(request:RequestCustomHeaders, response: NextApiResponse){
        try {
            const { databaseName, fileName, extension, collectionName } = request.body;
            const { connection_url } = request.headers;
            const exported = await new Collection().exportCollectionDataToJson(databaseName, fileName, extension, collectionName, connection_url);
            response.status(200).json(exported);
        } catch (error) {
            response.status(500).json('error');
        }
    }

}