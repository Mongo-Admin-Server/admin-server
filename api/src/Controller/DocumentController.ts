import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";
import { UpdateFilter } from "mongodb";
import { ApiError } from "./../Classes/Errors/ApiError";

export class DocumentController {
    
    public async getAllDocumentsByCollection(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[]): Promise<any> {
        const documents = await new Documents().getAllDocumentsByCollection(databaseName, collectionName);
        const countDocuments = await new Documents().countDocumentsByCollection(databaseName, collectionName);
        const avgSizeDocument = await new Documents().averageSizeDocumentsByCollection(databaseName, collectionName);
        const totalSizeDocument = await new Documents().totalSizeDocumentsByCollection(databaseName, collectionName);
        if(!documents ) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json({
                    databaseName: databaseName,
                    collectionName: collectionName,
                    result: documents,
                    count: countDocuments,
                    avgSize: avgSizeDocument,
                    totalSize: totalSizeDocument
                });
            } catch(error) {
                response.status(500).json('error');
            }
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