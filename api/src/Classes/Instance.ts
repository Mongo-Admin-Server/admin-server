import { MongoClient } from "mongodb";

export class Instance{
    private static client: MongoClient | null = null;
    
    static async connection(connection_url: string): Promise<MongoClient>{
        try{
            this.client = new MongoClient(connection_url);
            return await this.client.connect();
        }catch(error){
            throw error;
        }
    }

    static async deconnection(){
        if(this.client){
            await this.client.close();
            this.client = null;
        }
    }
}