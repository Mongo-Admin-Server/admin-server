import { Instance } from "./Instance";
import * as mongoSchema from "mongodb-schema";
export class Field{
    private client = Instance.Connection;

    public async listCollectionFields(databaseName: string, collectionName:string){
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);
        const documentStream = collection.find();
        const schema = await mongoSchema.parseSchema(documentStream);
        let fields = [];
        for(const field of schema.fields){
            fields.push(field.name);
        }
        return fields;
    }
}
