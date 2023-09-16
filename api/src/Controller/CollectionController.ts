import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "../Classes/Collection";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { RequestCustomCollection } from "@/domain/entities/collection-types";
import { ApiError } from "next/dist/server/api-utils";

export class CollectionController {
    
    public async getOneCollection(connection_url: string, databaseName: string) {
        try {
            const collectionNames = await new Collection().getOneCollectionDocumentsCount(databaseName, connection_url);
            if (!collectionNames)
                throw new ApiError(404, 'Collection not found');
            
            return collectionNames;
        } catch (error) {
            throw error;
        }
        
    }

    public async addOneCollection(connection_url: string, databaseName: string, collectionName: string) {
        try{
            const added = await new Collection().addNewCollection(databaseName, collectionName, connection_url);

            if(added === true)
                return true;
            else
                return added;
        }catch(error){
            throw error;
        }

    }

    public async deleteOneCollection(connection_url: string, databaseName: string, collectionName: string) {
        try {
            const deleted = await new Collection().deleteCollection(databaseName, collectionName, connection_url);
            if(deleted === true) return true;
            else return deleted;
        } catch (error) {
            throw error;
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