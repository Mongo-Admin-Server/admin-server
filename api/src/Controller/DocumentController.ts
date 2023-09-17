import { Documents } from "../Classes/Documents";
import { UpdateFilter } from "mongodb";

export class DocumentController {
    
    public async getAllDocumentsByCollection(connection_url: string, databaseName: string, collectionName: string, perPage: string, page: string, filter: any) {
        try {
            const { documents, total } = await new Documents().getAllDocumentsByCollection(connection_url, databaseName, collectionName, perPage, page, filter);
            return { documents, total }
        } catch (error) {
            throw error;
        }
    }

    public async getOneDocument(connection_url: string, databaseName: string, collectionName: string, id: string): Promise<any> {
        try {
            const document = await new Documents().getOneDocument(databaseName, collectionName, id, connection_url);
            return document;
        } catch (error) {
            throw error;
        }
    }

    public async addOneDocument(connection_url: string, databaseName: string, collectionName: string, documentToAdd: any): Promise<any> {
        try {
            const newDocument = await new Documents().addOneDocument(databaseName, collectionName, documentToAdd, connection_url);
            return newDocument;
        } catch (error) {
            throw error;
        }
    }

    public async deleteOneDocument(connection_url: string, databaseName: string, collectionName: string, id: string): Promise<any> {
        try {
            const deleteDocument = await new Documents().DeleteOneDocument(databaseName, collectionName, id, connection_url);
            return deleteDocument;
        } catch (error) {
            throw error;
        }
    }

    public async updateOneDocument(connection_url: string, databaseName: string, collectionName: string, id: string, updatedDocument: UpdateFilter<JSON>): Promise<any> {
        try {
            const updateDocument = await new Documents().updateOneDocument(databaseName, collectionName, id, updatedDocument, connection_url);
            return updateDocument;
        } catch (error) {
            throw error;
        }   
    }
}