import { Instance } from "./Instance";

export class Collection {

    public async getAllCollection(): Promise<any>{
        const instance = await new Instance().connection();
        const collections = await instance.db('marketplace').listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        return collectionNames;
    }
}
