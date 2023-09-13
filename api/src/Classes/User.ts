import { MongoClient,MongoServerError } from "mongodb";
import * as fs from 'fs'
export default class User{
    public async login(mongo_uri: string){
        
        try{
            const client = await new MongoClient(mongo_uri,{
                appName: 'MongoAdmin',
                connectTimeoutMS: 1000
            }).connect();
            await client.db("admin").command({ ping: 1 });
            // if(save === true){
            //     fs.writeFileSync('../../../.env',`MONGODB_URI=${mongo_uri}`);
            // }
            return true
        }catch(error){
           throw(error);
        }
    }
}