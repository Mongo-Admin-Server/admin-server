import { Instance } from "./Instance";

interface CollectionInfo {
    [key: string]: {
        count: number;
        avgDocumentSize: number;
        indexes: any[]; 
        totalDocumentSize: number;
        totalIndexSize: number;
        storageSize: number;
    };
}

interface Result {
    [key: string]: CollectionInfo;
}

export class Collection {

    public async getAllCollectionDocumentsCount(): Promise<any> {
        const instance = await new Instance().connection();
        const databaseNames = await instance.db().admin().listDatabases();
        const result: Result = {};

        for (const dbName of databaseNames.databases) {
            if (dbName.name != "local") {
                const db = instance.db(dbName.name);
                const collections = await db.listCollections().toArray();
                const collectionInfo: CollectionInfo = {};
                for (const collection of collections) {
                    const colName = collection.name;
                    const colStats = await db.collection(colName).stats();
                    const count = colStats.count;
                    const avgDocumentSize = colStats.avgObjSize;
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

                    collectionInfo[colName] = {
                        count: count,
                        avgDocumentSize: avgDocumentSize,
                        indexes: formattedIndexes,
                        totalDocumentSize: totalDocumentSize,
                        totalIndexSize: totalindexSize,
                        storageSize: storageSize,
                    };
                }

                result[dbName.name] = collectionInfo;
            }
        }

        return result;
    }

}
