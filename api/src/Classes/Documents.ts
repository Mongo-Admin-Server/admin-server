import { Instance } from "./Instance";
import { type WithId, type Document, ObjectId } from 'mongodb';

export class Documents {
    

    public async getAllDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<WithId<Document>[]>{
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new Error();
        }else{
            const collections = Array.isArray(collectionName) ? collectionName : [collectionName];
            const findAllPromises = collections.map(async (n) => {
                return client.db(databaseName).collection(n).find().toArray();
            });

            try {
                const allResults = await Promise.all(findAllPromises);
                const findAllDocuments = allResults.reduce((accumulator, current) => accumulator.concat(current), []);
                return findAllDocuments;
            } catch (error) {
                throw new Error(`Error fetching documents of collection ${collectionName}: ${error}`);
            }
        }
    }

   public async countDocumentsByCollection(name: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        try {
            let collections = Array.isArray(name) ? name : [name];
            let countDocuments = 0;

            for (const collectionName of collections) {
                const count = await client.db('marketplace').collection(collectionName).countDocuments();
                countDocuments += count;
            }

            return countDocuments;
        } catch (error) {
            throw new Error("Error counting documents : "+ error);
        }
    }

    public async averageSizeDocumentsByCollection(name: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        try {
            let collections = Array.isArray(name) ? name : [name];
            let totalDocuments = 0;
            let totalCount = 0;

            for(const collectionName of collections){
                let documents = await client.db('marketplace').collection(collectionName).find().toArray();
                if(!documents) {
                    throw new Error(`No documents found in the collection "${collectionName}"`);
                }

                totalDocuments += documents.length;
                const totalSize = documents.reduce((acc, document) => acc + JSON.stringify(document).length, 0);
                totalCount += totalSize;
            }
            
            const avgSize = totalCount / totalDocuments;
            return avgSize;
        } catch (error) {
            throw new Error("Error calculating average size of documents : "+ error);
        }
        
    }
    
    public async totalSizeDocumentsByCollection(name: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        try {
            let collections = Array.isArray(name) ? name : [name];
            let totalDocuments = 0;
            let totalCount = 0;

            for(const collectionName of collections){
                let documents = await client.db('marketplace').collection(collectionName).find().toArray();
                if(!documents) {
                    throw new Error(`No documents found in the collection "${collectionName}"`);
                }

                totalDocuments += documents.length;
                const totalSize = documents.reduce((acc, document) => acc + JSON.stringify(document).length, 0);
                totalCount += totalSize;
            }
            
            return totalCount;
        } catch (error) {
            throw new Error("Error calculating total size of documents : "+ error);
        }
    }
}