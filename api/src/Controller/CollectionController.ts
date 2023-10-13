import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "../Classes/Collection";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { RequestCustomCollection } from "@/domain/entities/collection-types";
import { ApiError } from "next/dist/server/api-utils";

export class CollectionController {
    
    public async getOneCollection(databaseName: string) {
        try {
            const collectionNames = await new Collection().getOneCollectionDocumentsCount(databaseName);
            if (!collectionNames)
                throw new ApiError(404, 'Collection not found');
            
            return collectionNames;
        } catch (error) {
            throw error;
        }
        
    }

    public async addOneCollection(databaseName: string, collectionName: string) {
        try{
            const added = await new Collection().addNewCollection(databaseName, collectionName);

            if(added === true)
                return true;
            else
                return added;
        }catch(error){
            throw error;
        }

    }

    public async deleteOneCollection(databaseName: string, collectionName: string) {
        try {
            const deleted = await new Collection().deleteCollection(databaseName, collectionName);
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
            const exported = await new Collection().exportCollectionDataToJson(databaseName, fileName, extension, collectionName);
            response.status(200).json(exported);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    public async importCollectionData(request:RequestCustomHeaders, response: NextApiResponse){
        try {
            const { databaseName, fileName, collectionName } = request.body;
            const { connection_url } = request.headers;
            const imported = await new Collection().importDataToCollection(databaseName, fileName, collectionName);
            response.status(200).json(imported);
        } catch (error) {
            response.status(500).json(error);
        }
    }

}