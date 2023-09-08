import { Instance } from "./Instance";
import { IResult} from '../types/IResult';
import { ICollectionInfo } from '../types/ICollectionInfo';
import { ApiError } from "./Errors/ApiError";
 

export class Collection {

    public async getOneCollectionDocumentsCount(databaseName: string): Promise<ICollectionInfo[]> {
        const instance = await new Instance().connection();
        const db = instance.db(databaseName);
        const collectionsList = await db.listCollections().toArray();
        let collectionInfo: ICollectionInfo[] = [];

        for (const collection of collectionsList) {
            const colName = collection.name;
            const colStats = await db.collection(colName).stats();
            const count = colStats.count;
            const avgDocumentSize = count !== 0 ? colStats.avgObjSize : 0;
            const totalDocumentSize = colStats.size;
            const totalindexSize = colStats.totalIndexSize;
            const storageSize = colStats.storageSize;
            const indexes = await db.collection(colName).indexes();
            const formattedIndexes = indexes.map((index) => {
                const keyFields = Object.keys(index.key).join(', ');
                return {
                    key: index.key._id
                };
            });

            collectionInfo.push({
                collectionName: colName,
                count: count,
                avgDocumentSize: avgDocumentSize,
                indexes: formattedIndexes,
                totalDocumentSize: totalDocumentSize,
                totalIndexSize: totalindexSize,
                storageSize: storageSize,
            });
        }
        await instance.close();
        return collectionInfo;
    }

    public async addNewCollection(databaseName: string, collectionName: string): Promise<String | ApiError> {
        try{   
            const instance = await new Instance().connection();
            const db = instance.db(databaseName);

            if(!collectionName)
            return new ApiError(400, 'query/invalid', 'invalid_collection_name')

            const collectionsList = await db.listCollections().toArray();
            let compteur = 0;
            for (const collection of collectionsList) {
                if(collection.name == collectionName)
                    compteur = 1;
            }

            if(compteur > 0) 
            return new ApiError(409, 'collection/duplicate-value', 'collection_already_exist')

            await db.createCollection(collectionName);
            return 'collection_created'
        }catch(error){
            throw(error);
        }
    }


    public async deleteCollection(databaseName: string, collectionName: string): Promise<String | ApiError>{
        try{
            const instance = await new Instance().connection();
            const db = instance.db(databaseName);

            if(!collectionName)
            return new ApiError(400, 'query/invalid', 'invalid_collection_name')
        
            await db.dropCollection(collectionName);
            return 'collection_deleted'
        }catch(error){
            throw(error);
        }
    }

}
