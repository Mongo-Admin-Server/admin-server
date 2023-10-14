import { Instance } from "./Instance";
import { IResult} from '../../../domain/entities/api/IResult';
import { ApiError } from "./Errors/ApiError";
import { CollectionType } from "@/domain/entities/collection-types";
import fs from "fs";
import os from 'os';
import path from 'path';
import json2csv from 'json2csv';

export class Collection {

    public async getOneCollectionDocumentsCount(databaseName: string): Promise<CollectionType[]> {
        const instance = Instance.Connection;
        const db = instance.db(databaseName);
        const collectionsList = await db.listCollections().toArray();
        let collectionInfo: CollectionType[] = [];

        for (const collection of collectionsList) {
            const colName = collection.name;
            const colStats = await db.collection(colName).stats();
            const count = colStats.count;
            const avgDocumentSize = count !== 0 ? colStats.avgObjSize : 0;
            const totalDocumentSize = colStats.size;
            const totalindexSize = colStats.totalIndexSize;
            const storageSize = colStats.storageSize;
            const indexes = await db.collection(colName).indexes();
            const formattedIndexes = indexes.map((index) => {
                const keyFields = Object.keys(index.key).join(', ');
                return {
                    key: index.key._id
                };
            });

            collectionInfo.push({
                collectionName: colName,
                count: count,
                avgDocumentSize: avgDocumentSize,
                indexes: formattedIndexes,
                totalDocumentSize: totalDocumentSize,
                totalIndexSize: totalindexSize,
                storageSize: storageSize,
            });
        }
        return collectionInfo;
    }

    public async addNewCollection(databaseName: string, collectionName: string): Promise<true | ApiError> {
        try{   
            const instance = Instance.Connection;
            const db = instance.db(databaseName);

            if(!collectionName)
            return new ApiError(400, 'query/invalid', 'invalid_collection_name')

            const collectionsList = await db.listCollections().toArray();
            let compteur = 0;
            for (const collection of collectionsList) {
                if(collection.name == collectionName)
                    compteur = 1;
            }

            if(compteur > 0) 
            return new ApiError(409, 'collection/duplicate-value', 'collection_already_exist')

            await db.createCollection(collectionName);
            return true
        }catch(error){
            throw(error);
        }
    }


    public async deleteCollection(databaseName: string, collectionName: string): Promise<true | ApiError>{
        try{
            const instance = Instance.Connection;
            const db = instance.db(databaseName);

            if(!collectionName)
            return new ApiError(400, 'query/invalid', 'invalid_collection_name')
        
            await db.dropCollection(collectionName);
            return true;
        }catch(error){
            throw(error);
        }
    }

    public async exportCollectionDataToJson(databaseName:string, fileName:string, extension: string,collectionName: string): Promise<true>{
        try{
            const instance = Instance.Connection;
            const db = instance.db(databaseName);
            const collection = db.collection(collectionName);
            const data = await collection.find({}).toArray();

            await instance.close();

            if (fileName == ""){
                fileName = collectionName
            }

            let downloadPath = path.join(os.homedir(),'Downloads',`${fileName}.${extension}`);
            if (extension === 'json'){
                fs.writeFileSync(downloadPath, JSON.stringify(data, null, 2));
            }else if(extension === 'csv'){
                fs.writeFileSync(downloadPath, json2csv.parse(data, {header: true}));
            }
            return true;
        }catch(error){
            throw(error);
        }
    }

    public async importDataToCollection(databaseName:string, fileName:string, collectionName: string): Promise<true>{
        try{
            const instance = Instance.Connection;
            const db = instance.db(databaseName);
            const collection = db.collection(collectionName);
            let data;
            if(fileName.endsWith('.json')) {
                const fileData = fs.readFileSync(fileName, 'utf8');
                data = JSON.parse(fileData);
            }else if (fileName.endsWith('.csv')) {
                const fileData = fs.readFileSync(fileName, 'utf8');
                data = json2csv.parse(fileData, {header: true, delimiter: ','});
            }else {
                throw new Error('unsupported file');
            }
            const result = await collection.insertMany(data);
            await instance.close();

            return true;
        }catch(error){
            throw(error);
        }
    }

}
