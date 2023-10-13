import { MongoClient } from "mongodb";

export class Instance{
    
    private static client: MongoClient | null = null;
    
    static async connection(): Promise<MongoClient>{
        try{
            const connection_url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017"
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