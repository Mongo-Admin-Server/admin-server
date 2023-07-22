import { MongoClient } from "mongodb";

export class Instance{
    
    public async connection() :  Promise<boolean | unknown>{
        if(!process.env.MONGODB_URI)
            return false;
        const uri = process.env.MONGODB_URI;
        let client = new MongoClient(uri);
        try{
            client.connect();
            let pingResponse = await client.db('admin').command({ ping:1 });
            if(!pingResponse.ok)
                return false;
            return true;
        }catch(error){
            throw(error);
        }finally{
            await client.close();
        }
    }
}