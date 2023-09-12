import { MongoClient } from "mongodb";

export class Instance{
    private static client: MongoClient;

    static get Client(): MongoClient{
        
        const uri = process.env.MONGODB_URI || '';
        if(!this.client)
            this.client = new MongoClient(uri)
        return this.client;
    }
}