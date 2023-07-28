import { MongoClient } from "mongodb";

export class Instance{
    
    public connection() : MongoClient{
        try{
            let uri = process.env.MONGODB_URI || '';
            let client = new MongoClient(uri);
            return client;
        }catch(error){
            throw(error);
        }
    }
}