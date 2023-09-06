import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";

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
                response.status(200).json(newDocument);
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
                response.status(200).json(deleteDocument);
            } catch (error) {
                response.status(500).json('error');
            }
        }
    }
}