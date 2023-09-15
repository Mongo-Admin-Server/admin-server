import { Documents } from "../Classes/Documents";
import { UpdateFilter, Document } from "mongodb";
import { ApiError } from "./../Classes/Errors/ApiError";
import { RequestIndexDocument } from "@/domain/entities/document-types";
import { NextApiRequest, NextApiResponse } from "next";

export class DocumentController {
    
    public async getAllDocumentsByCollection(response: NextApiResponse, request: RequestIndexDocument): Promise<void> {
        try {
            const { documents, total } = await new Documents().getAllDocumentsByCollection(request);
            response.status(200).json({ documents, total });
        } catch (error) {
            response.status(500).json('error');
        }
    }

    public async getOneDocument(response: NextApiResponse, request: RequestIndexDocument): Promise<any> {
        
        const { databaseName, collectionName, id } = request.query;
        const { connection_url } = request.headers;

        const document = await new Documents().getOneDocument(databaseName, collectionName, id, connection_url);
        if(!document) {
            response.status(404).json('error');
        } else {
            try {
                const { connection_url } = request.headers
                response.status(200).json(document);
            } catch(error) {
                response.status(500).json('error');
            }
        }
    }

    public async addOneDocument(response: NextApiResponse, request:RequestIndexDocument): Promise<any> {
        
        const { databaseName } = request.query;
        const { collectionName } = request.query;
        const { id } = request.query;
        const { connection_url } = request.headers;
        const { documentToAdd } = request.body;

        const newDocument = await new Documents().addOneDocument(databaseName, collectionName, documentToAdd, connection_url);
        if(!newDocument) {
            response.status(404).json('Error, no document provided for the inserting');
        } else {
            try {
                const { connection_url } = request.headers
                if(newDocument.acknowledged === true && newDocument.insertedId){
                    response.status(200).json(true);
                } else {
                    const documentEerror = new ApiError(400, 'validation/failed', "The new document has not been inserted");
                    response.status(documentEerror.code).json(documentEerror.message);
                }                
            } catch(error) {
                response.status(500).json('error');
            }
        }
    }

    public async DeleteOneDocument(response: NextApiResponse, request:RequestIndexDocument): Promise<any> {
        
        const { databaseName } = request.query;
        const { collectionName } = request.query;
        const { id } = request.query;
        const { connection_url } = request.headers;
        
        const deleteDocument = await new Documents().DeleteOneDocument(databaseName, collectionName, id, connection_url);
        
        if(!deleteDocument) {
            response.status(404).json('Error, no document provided for the deleting');
        } else {
            try {
                const { connection_url } = request.headers
                if(deleteDocument.acknowledged === true && deleteDocument.deletedCount === 1) {
                    response.status(200).json(true);
                } else if(deleteDocument.acknowledged === true && deleteDocument.deletedCount === 0) {
                    const documentEerror = new ApiError(404, 'query/not-found', 'The document has not been found');
                    response.status(documentEerror.code).json(documentEerror.message);
                } else {
                    const documentEerror = new ApiError(400, 'validation/failed', 'The document has not been deleted');
                    response.status(documentEerror.code).json(documentEerror.message);
                }                
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }

    public async UpdateOneDocument(response: NextApiResponse, request: RequestIndexDocument) {
        
        const { databaseName } = request.query;
        const { collectionName } = request.query;
        const { id } = request.query;
        const { connection_url } = request.headers;
        const updatedDocument:  UpdateFilter<JSON> = request.body
        
        const updateDocument = await new Documents().updateOneDocument(databaseName, collectionName, id, updatedDocument, connection_url);
        
        if(!updateDocument) {
            response.status(404).json('Error, no document provided for the updating');
        } else {
            try {
                const { connection_url } = request.headers
                if(updateDocument.acknowledged === true && updateDocument.modifiedCount === 1 && updateDocument.matchedCount === 1) {
                    response.status(200).json(true);
                } else if (updateDocument.acknowledged === true && updateDocument.modifiedCount === 0 && updateDocument.matchedCount === 1) {
                    response.status(200).json(true);
                } else if (updateDocument.acknowledged === true && updateDocument.modifiedCount === 0 && updateDocument.matchedCount === 0) {
                    const documentEerror =  new ApiError(404, 'sql/not-found', 'The document has not been found');
                    response.status(documentEerror.code).json(documentEerror.message);
                }
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }
}