import { Instance } from "./Instance";
import { type WithId, type Document, ObjectId } from 'mongodb';
const client = new Instance().connection();

export class Documents {
    
    public async getAllDocuments(): Promise<{ [collectionName: string]: {collectionName: string, result: WithId<Document>[], count: number, avgSize: number, totalSize: number } }>{
        const collections = await client.db('marketplace').listCollections().toArray()
        const collectionNames = collections.map((n) => n.name);

        const allResults: { [collectionName: string]: {collectionName: string, result: WithId<Document>[], count: number, avgSize: number, totalSize: number } } = {};
        try {
            for(const collection of collectionNames) {
                const documents = await this.getAllDocumentsByCollection(collection);
                const count = await this.countDocumentsByCollection(collection);
                const avgSize = await this.averageSizeDocumentsByCollection(collection);
                const totalSize = await this.totalSizeDocumentsByCollection(collection);
                allResults[collection] = {collectionName: collection, result: documents, count, avgSize, totalSize };
            }        
            return allResults;
        } catch(error) {
            throw new Error(`Error fetching all documents of all collection`);
        }
    }

    public async getAllDocumentsByCollection(name: string | string[]): Promise<WithId<Document>[]>{
        
        const collections = Array.isArray(name) ? name : [name];
        const findAllPromises = collections.map(async (n) => {
            return client.db('marketplace').collection(n).find().toArray();
        });

        try {
            const allResults = await Promise.all(findAllPromises);
            const findAllDocuments = allResults.reduce((accumulator, current) => accumulator.concat(current), []);
            return findAllDocuments;
        } catch (error) {
            throw new Error(`Error fetching documents of collection ${name}: ${error}`);
        }
    }

   public async countDocumentsByCollection(name: string | string[]): Promise<number> {
        
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