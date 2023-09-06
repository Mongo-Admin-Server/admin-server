import { Instance } from "./Instance";
import { IResult} from '../types/IResult';
import { ICollectionInfo } from '../types/ICollectionInfo';
 

export class Collection {

    // public async getAllCollectionDocumentsCount(): Promise<any> {
    //     const instance = await new Instance().connection();
    //     const databaseNames = await instance.db().admin().listDatabases();
    //     const result: IResult = {};

    //     for (const dbName of databaseNames.databases) {
    //         if (dbName.name != "local") {
    //             const db = instance.db(dbName.name);
    //             const collections = await db.listCollections().toArray();
    //             const collectionInfo: ICollectionInfo = {};
    //             for (const collection of collections) {
    //                 const colName = collection.name;
    //                 const colStats = await db.collection(colName).stats();
    //                 const count = colStats.count;
    //                 const avgDocumentSize = count !== 0 ? colStats.avgObjSize : 0;
    //                 const totalDocumentSize = colStats.size;
    //                 const totalindexSize = colStats.totalIndexSize;
    //                 const storageSize = colStats.storageSize;


    //                 const indexes = await db.collection(colName).indexes();
    //                 const formattedIndexes = indexes.map((index) => {
    //                     const keyFields = Object.keys(index.key).join(', ');
    //                     return {
    //                         key: index.key._id
    //                     };
    //                 });

    //                 collectionInfo[colName] = {
    //                     count: count,
    //                     avgDocumentSize: avgDocumentSize,
    //                     indexes: formattedIndexes,
    //                     totalDocumentSize: totalDocumentSize,
    //                     totalIndexSize: totalindexSize,
    //                     storageSize: storageSize,
    //                 };
    //             }

    //             result[dbName.name] = collectionInfo;
    //         }
    //     }

    //     return result;
    // }

    public async getOneCollectionDocumentsCount(databaseName: string): Promise<ICollectionInfo[]> {
        const instance = await new Instance().connection();
        const db = instance.db(databaseName);
        const collectionsList = await db.listCollections().toArray()
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

    public async addNewCollection(databaseName: string, collectionName: string) {
        try{   
            const instance = await new Instance().connection();
            const db = instance.db(databaseName);
            await db.createCollection(collectionName);
            return {
                status: 'success',
                detatils:'collection_created'
            }
        }catch(error){
            throw(error);
        }
    }


    public async deleteCollection(databaseName: string, collectionName: string){
        try{
            const instance = await new Instance().connection();
            const db = instance.db(databaseName);
            await db.dropCollection(collectionName);
            return {
                status: 'success',
                detatils:'collection_deleted'
            }
        }catch(error){
            throw(error);
        }
    }

}
