import { RequestIndexDocument } from "@/domain/entities/document-types";
import { ApiError } from "./Errors/ApiError";
import { Instance } from "./Instance";
import { type WithId, type Document, ObjectId, InsertOneResult, DeleteResult, UpdateResult, UpdateFilter, Filter } from 'mongodb';

export class Documents {

    public async getAllDocumentsByCollection(databaseName: string, collectionName: string, perPage: string, page: string, filter: any): Promise<{ documents: WithId<Document>[], total: number }>{
        const _perPage = parseInt(perPage) || 10;
        const _currentPage = parseInt(page) || 0;

        const client = Instance.Connection;

        try {
            const documents = await client.db(databaseName).collection(collectionName).find(filter).skip(_currentPage * _perPage).limit(_perPage).toArray();
            const total = await client.db(databaseName).collection(collectionName).countDocuments(filter);

            return { documents, total };
        } catch (error) {
            throw new Error("Error getting all documents by collection : " + error);
        }
    }

   public async countDocumentsByCollection(databaseName: string | string[], collectionName: string | string[]): Promise<number> {
        const client = Instance.Connection;
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
            }
        }
    }

    public async averageSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[],): Promise<number> {
        const client = Instance.Connection;
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
            }
        }        
    }
    
    public async totalSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[],): Promise<number> {
        const client = Instance.Connection;
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
            }
        }
        
    }

    public async getOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[]) {
        const client = Instance.Connection;

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
            }
        }                   
    }

    public async addOneDocument(databaseName: string, collectionName: string, query: JSON,): Promise<InsertOneResult<Document>> {
        const client = Instance.Connection;
        try {
            const collection = client.db(databaseName).collection(collectionName);
            const newDocument = await collection.insertOne(query);
            return newDocument;
        } catch(error) {
            throw error;
        }
    }

    public async DeleteOneDocument(databaseName: string, collectionName: string, id: string): Promise<DeleteResult> {
        try{
            const client = Instance.Connection;
            const collection = client.db(databaseName).collection(collectionName);
            const query = { _id: new ObjectId(id) }
            const deletedDocument = await collection.deleteOne(query)
            return deletedDocument;            
        }catch(error){
            console.error(error);
            throw error;
        }
      
    }

    public async updateOneDocument(databaseName: string, collectionName: string, id: string, newBody: UpdateFilter<JSON>, ): Promise<UpdateResult> {
        const client = Instance.Connection;

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
            }
        }
    }
}