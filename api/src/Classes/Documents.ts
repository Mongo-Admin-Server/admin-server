import { RequestIndexDocument } from "@/domain/entities/document-types";
import { ApiError } from "./Errors/ApiError";
import { Instance } from "./Instance";
import { type WithId, type Document, ObjectId, InsertOneResult, DeleteResult, UpdateResult, UpdateFilter } from 'mongodb';

export class Documents {

    public async getAllDocumentsByCollection(request: RequestIndexDocument): Promise<{ documents: WithId<Document>[], total: number }>{
        
        const { connection_url } = request.headers
        const { databaseName, collectionName, perPage, page } = request.query;
        
        const _perPage = parseInt(perPage) || 10;
        const _currentPage = parseInt(page) || 0;

        const client = await Instance.connection(connection_url);;

        try {
            const documents = await client.db(databaseName).collection(collectionName).find().skip(_currentPage * _perPage).limit(_perPage).toArray();
            const total = await client.db(databaseName).collection(collectionName).countDocuments();

            return { documents, total };
        } catch (error) {
            throw new Error("Error getting all documents by collection : " + error);
        } finally {
            await client.close();
        }
    }

   public async countDocumentsByCollection(databaseName: string | string[], collectionName: string | string[], connection_url:string): Promise<number> {
        const client = await Instance.connection(connection_url);;
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

    public async averageSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[],  connection_url:string): Promise<number> {
        const client = await Instance.connection(connection_url);;
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
    
    public async totalSizeDocumentsByCollection(databaseName: string | string[], collectionName: string | string[],  connection_url:string): Promise<number> {
        const client = await Instance.connection(connection_url);;
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

    public async getOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[], connection_url:string) {
        const client = await Instance.connection(connection_url);;

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

    public async addOneDocument(databaseName: string | string[], collectionName: string | string[], query: JSON,  connection_url:string): Promise<InsertOneResult<Document>> {
        const client = await Instance.connection(connection_url);;
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

    public async DeleteOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[],  connection_url:string): Promise<DeleteResult> {
        const client = await Instance.connection(connection_url);;

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

    public async updateOneDocument(databaseName: string | string[], collectionName: string | string[], id: string | string[], newBody: UpdateFilter<JSON>,  connection_url:string): Promise<UpdateResult> {
        const client = await Instance.connection(connection_url);;

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