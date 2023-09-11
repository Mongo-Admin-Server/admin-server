import { Db } from "mongodb";
import { Instance } from "./Instance";
import { IDatabaseRO } from "../types/IDatabase";


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
}
