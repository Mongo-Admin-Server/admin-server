import { MongoClient } from "mongodb";

export class Instance{
    
    protected static client: MongoClient;
    private static connection_url: string = process.env.MONGODB_URI || '';
    
    static get Connection(): MongoClient{
        if(!this.client){
            this.client = new MongoClient(this.connection_url);
        }
        return this.client;
    }

    static get Url(): string{
        return this.connection_url;
    }

    static async deconnection(){
        if(this.client){
            await this.client.close();
            // this.client = null;
            this.connection_url = '';
        }
    }
}