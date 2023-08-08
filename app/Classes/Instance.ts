/* eslint-disable no-useless-catch */
import { MongoClient } from "mongodb";

export class Instance{
    
    public connection() : MongoClient{
        try{ //todo delete try catch
            let uri = process.env.MONGODB_URI || '';
            let client = new MongoClient(uri);
            return client;
        }catch(error){
            throw(error);
        }
    }
}