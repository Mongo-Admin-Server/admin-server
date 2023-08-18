/* eslint-disable no-useless-catch */
import { MongoClient } from "mongodb";

export class Instance{
    
    public async connection() : Promise<MongoClient>{
        const uri = process.env.MONGODB_URI || '';
        const client = new MongoClient(uri);
        try{
            return await client.connect();
        }catch(error){
            throw(error);
        }
    }
}