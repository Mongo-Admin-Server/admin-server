import { Db } from "mongodb";
import { Instance } from "./Instance";
import { ApiError } from "./Errors/ApiError";
import { IDatabaseRO } from "@/domain/entities/database-types";
import fs from "fs";
import os from 'os';
import path from 'path';
import json2csv from 'json2csv';

export class Database{
    public async listDatabase() {
        const client  = Instance.Connection;
        try{
            const listDatabase = await client.db().admin().listDatabases(); //todo add authoreddatabase to true
            const rows: IDatabaseRO[] = []
            for(const database of listDatabase.databases){
                const db: Db = client.db(database.name);
                const collections = await db.collections();
                const totalCollection = collections.length;
                rows.push({
                    name: database.name,
                    sizeOnDisk: database.sizeOnDisk,
                    empty: database.empty,
                    collections: totalCollection
                });
            }
            return({
                rows: rows,
            })
        }catch(error){
            throw error;
        }
        
    }

    public async createDatabase(databaseName: string, collectionName: string, connection_url: string): Promise<true | ApiError>{
        try{
            const client = Instance.Connection;
            
            if(!databaseName || databaseName == 'admin')
                return new ApiError(400, 'query/invalid', 'invalid_database_name')
            if(!collectionName)
                return new ApiError(400, 'query/invalid', 'invalid_collection_name')
            
            //check if db already exist
            const test = await client.db(databaseName).command({
                dbStats:1
            });
            if(test.collections > 0)
                return new ApiError(409, 'database/duplicate-value', 'database_already_exist')
            
            const db = new Db(client, databaseName);
            db.createCollection(collectionName);
            return true
        }catch(error){
            throw(error);
        }
    }

    public async dropDatabase(databaseName: string | string[] | undefined, connection_url:string): Promise<boolean | ApiError>{
        if(!databaseName)
            return new ApiError(400, 'query/not-found', 'database_name_not_found');
        try{            
            const client = Instance.Connection;
           
            if(Array.isArray(databaseName)){
                for(let index=0; index < databaseName.length; index++){
                    const stats = await client.db(databaseName[index]).command({
                        dbStats:1
                    });
                    if(stats.collections === 0)
                        return new ApiError(400, 'database/not-found', 'database_not_found')
                    await client.db(databaseName[index]).dropDatabase();
                }
                return true;
            }else{
                const stats = await client.db(databaseName).command({
                    dbStats:1
                });
                if(stats.collections === 0)
                    return new ApiError(400, 'database/not-found', 'database_not_found')
                const status = await client.db(databaseName).dropDatabase();
                return status;
            }
            
        }catch(error){
            throw(error);
        }
    }


    public async exportDatabaseToJson(databaseName:string, fileName:string, extension: string): Promise<true>{
        try{
            const instance = Instance.Connection;
            const db = instance.db(databaseName);
            const collectionNames = await db.listCollections().toArray();
            const databaseData: {[key: string]: any[]} = {};

            for (const collectionName  of collectionNames) {
                 const colName = collectionName.name;
                 const collection = db.collection(colName);
                 const data = await collection.find({}).toArray();
                 databaseData[colName] = data;
            }
            await instance.close();
            if (fileName == ""){
                fileName = databaseName
            }
            let downloadPath = path.join(os.homedir(),'Downloads',`${fileName}.${extension}`);
            if (extension === 'json'){
                fs.writeFileSync(downloadPath, JSON.stringify(databaseData, null, 2));
            }else if(extension === 'csv'){
                fs.writeFileSync(downloadPath, json2csv.parse({ data: databaseData, fields: Object.keys(databaseData)}));
            }
            return true;
        }catch(error){
            throw(error);
        }
    }

}
