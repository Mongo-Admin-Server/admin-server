import { ApiError } from "./Errors/ApiError";
import { Instance } from "./Instance";
import { type WithId, type Document, ObjectId, InsertOneResult, DeleteResult, UpdateResult, UpdateFilter } from 'mongodb';

export class Documents {

    public async getAllDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<WithId<Document>[]>{
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
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
            }finally{
               await client.close();
            }
        }
    }

   public async countDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else{
            try {
            let collections = Array.isArray(collectionName) ? collectionName : [collectionName];
            let countDocuments = 0;

            for (const collectionName of collections) {
                const count = await client.db(databaseName).collection(collectionName).countDocuments();
                countDocuments += count;
            }

            return countDocuments;
            } catch (error) {
                throw new Error("Error counting documents : "+ error);
            }finally{
                await client.close();
            }
        }
    }

    public async averageSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else{
            try {
                let collections = Array.isArray(collectionName) ? collectionName : [collectionName];
                let totalDocuments = 0;
                let totalCount = 0;
    
                for(const collectionName of collections){
                    let documents = await client.db(databaseName).collection(collectionName).find().toArray();
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
            }finally{
                await client.close();
            }
        }        
    }
    
    public async totalSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<number> {
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else{
            try {
                let collections = Array.isArray(collectionName) ? collectionName : [collectionName];
                let totalDocuments = 0;
                let totalCount = 0;
    
                for(const collectionName of collections){
                    let documents = await client.db(databaseName).collection(collectionName).find().toArray();
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
            }finally{
                await client.close();
            }
        }
        
    }

    public async getOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[]) {
        const client = await new Instance().connection();

        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(Array.isArray(collectionName)){
            throw new ApiError(400, 'query/invalid', 'the collection name is incorrect');
        } else if(Array.isArray(id)){
            throw new ApiError(400, 'query/invalid', 'the id is incorrect');
        } else {
            const queryId = { _id: new ObjectId(id) };
            const collection = client.db(databaseName).collection(collectionName);
            try {
                const document = await collection.findOne(queryId);
                return document;
            } catch (error) {
                throw new Error(`Error retrieving document in ${collectionName} : ${error}`);
            }finally{
                await client.close();
            }
        }                   
    }

    public async addOneDocument(databaseName: string | string[], collectionName: string | string[], query: JSON): Promise<InsertOneResult<Document>> {
        const client = await new Instance().connection();
        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(Array.isArray(collectionName)){
            throw new ApiError(400, 'query/invalid', 'the collection name is incorrect');
        } else {
            const collection = client.db(databaseName).collection(collectionName);
            try {
                const newDocument = await collection.insertOne(query);
                return newDocument;
            } catch(error) {
                throw new Error(`Error inserting new document in ${collectionName} : ${error}`);
            }finally{
                await client.close();
            }
        }
        
    }

    public async DeleteOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[]): Promise<DeleteResult> {
        const client = await new Instance().connection();

        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(Array.isArray(collectionName)){
            throw new ApiError(400, 'query/invalid', 'the collection name is incorrect');
        } else if(Array.isArray(id)){
            throw new ApiError(400, 'query/invalid', 'the id is incorrect');
        } else {
            const queryId = {_id: new ObjectId(id)};
            const collection = client.db(databaseName).collection(collectionName);
            try {
                const deleteDocument = await collection.deleteOne(queryId);
                return deleteDocument;
            } catch (error) {
                throw new Error(`Error deleting document in ${collectionName} with id ${queryId}: ${error}`);
            }finally{
                await client.close();
            }
        }        
    }

    public async updateOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[], newBody: UpdateFilter<JSON>): Promise<UpdateResult> {
        const client = await new Instance().connection();

        if(Array.isArray(databaseName)){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(Array.isArray(collectionName)){
            throw new ApiError(400, 'query/invalid', 'the collection name is incorrect');
        } else if(Array.isArray(id)){
            throw new ApiError(400, 'query/invalid', 'the id is incorrect');
        } else {
            const queryId = {_id: new ObjectId(id)};
            const collection = client.db(databaseName).collection(collectionName);
            try {
                const updateDocument = await collection.updateOne(queryId, {"$set": newBody});
                return updateDocument;
            } catch(error) {
                throw new Error(`Error updating document in ${collectionName} with id ${queryId}: ${error}`);
            }finally{
                await client.close();
            }
        }
    }
}