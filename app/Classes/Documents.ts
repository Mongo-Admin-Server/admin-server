import { Instance } from "./Instance";
import type { WithId, Document } from 'mongodb';

export class Documents {

    public async getAllDocuments(): Promise<WithId<Document>[]>{
        let client = new Instance().connection();
        let findAllDocument = await client.db('marketplace').collection('products').find().toArray();        
        return findAllDocument;
    }

    public async getOneDocument(): Promise<any>{
        let client = new Instance().connection();
        let findDocument = client.db('marketplace').collection('products').findOne();//.toArray();        
        return findDocument;
    }
}