import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";
import { UpdateFilter } from "mongodb";
import { ApiError } from "./../Classes/Errors/ApiError";
import { RequestCustomDocument } from "@/api/src/types/IDocument";

export class DocumentController {
    
    public async getAllDocumentsByCollection(response: NextApiResponse, request: RequestCustomDocument): Promise<void> {
        try {
            const { databaseName, name, perPage, page } = request.query;
            const { documents, total } = await new Documents().getAllDocumentsByCollection(databaseName, name, perPage, page);
            response.status(200).json({ documents, total });
        } catch (error) {
            response.status(500).json('error');
        }
    }

    public async getOneDocument(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[], id: string | string[]): Promise<any> {
        const document = await new Documents().getOneDocument(databaseName, collectionName, id);
        if(!document) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json(document);
            } catch(error) {
                response.status(500).json('error');
            }
        }
    }

    public async addOneDocument(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[], query: JSON): Promise<any> {
        const newDocument = await new Documents().addOneDocument(databaseName, collectionName, query);
        if(!newDocument) {
            response.status(404).json('Error, no document provided for the inserting');
        } else {
            try {
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

    public async DeleteOneDocument(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[], id: string | string[]): Promise<any> {
        const deleteDocument = await new Documents().DeleteOneDocument(databaseName, collectionName, id);
        if(!deleteDocument) {
            response.status(404).json('Error, no document provided for the deleting');
        } else {
            try {
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

    public async UpdateOneDocument(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[], id: string | string[], newBody: UpdateFilter<JSON>) {
        const updateDocument = await new Documents().updateOneDocument(databaseName, collectionName, id, newBody);
        if(!updateDocument) {
            response.status(404).json('Error, no document provided for the updating');
        } else {
            try {
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