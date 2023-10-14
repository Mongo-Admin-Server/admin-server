import { ListIndexesCursor } from "mongodb";
import { Instance } from "./Instance";
import * as mongoSchema from "mongodb-schema";

export class Index {
    private client = Instance.Connection;
    
    public async createIndex(databaseName: string, collectionName: string, field: string, unique: boolean): Promise<string>{
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);
        const indexCreated = await collection.createIndex(field, {unique: unique});
        return indexCreated;
    }

    public async listIndex(databaseName: string, collectionName: string){
        const database = this.client.db(databaseName);
        const collection = database.collection(collectionName);
        const listIndexes = await collection.listIndexes().toArray();
        return listIndexes;
    }

    public async test(){
        const database = this.client.db("marketplace");
        const collection = database.collection("products");
        const documentStream = collection.find();
        const schema = await mongoSchema.parseSchema(documentStream);
        console.log(schema)
    }
}