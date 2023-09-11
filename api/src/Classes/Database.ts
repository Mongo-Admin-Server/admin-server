import { Db } from "mongodb";
import { Instance } from "./Instance";
import { IDatabaseRO } from "../types/IDatabase";
import { database } from "@/infrastructure";
import { ApiError } from "./Errors/ApiError";


export class Database{
    
    public async listDatabase() {
        const client  = await new Instance().connection();
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
        }finally{
            await client.close();
        }
        
    }

    public async createDatabase(databaseName: string, collectionName: string): Promise<true | ApiError>{
        try{
            const client = await new Instance().connection();
            
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

    public async dropDatabase(databaseName: string | string[] | undefined): Promise<boolean | ApiError>{
        if(!databaseName)
            return new ApiError(400, 'query/not-found', 'database_name_not_found');
        try{            
            const client = await new Instance().connection();
           
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
}
