import { Documents } from "../Classes/Documents"; 
import { DeleteResult, UpdateFilter } from "mongodb";
import { ApiError } from "../Classes/Errors/ApiError";
import { NextResponse } from "next/server";


export class DocumentController {
    
    public async getAllDocumentsByCollection(databaseName: string, collectionName: string, perPage: string, page: string, filter: any) {
        try {
            const { documents, total } = await new Documents().getAllDocumentsByCollection(databaseName, collectionName, perPage, page, filter);
            return { documents, total }
        } catch (error) {
            throw error;
        }
    }

    public async getOneDocument(databaseName: string, collectionName: string, id: string): Promise<any> {
        try {
            const document = await new Documents().getOneDocument(databaseName, collectionName, id, );
            return document;
        } catch (error) {
            throw error;
        }
    }

    public async addOneDocument(databaseName: string, collectionName: string, documentToAdd: any): Promise<any> {
        try {
            const newDocument = await new Documents().addOneDocument(databaseName, collectionName, documentToAdd, );
            return newDocument;
        } catch (error) {
            throw error;
        }
    }

    public async deleteOneDocument(databaseName: string, collectionName: string, id: string): Promise<NextResponse> {
        try {
            const deleteDocument = await new Documents().DeleteOneDocument(databaseName, collectionName, id);
            if (deleteDocument.acknowledged === true && deleteDocument.deletedCount === 1)
                return new NextResponse(JSON.stringify(true), {
                    status: 200,
                });
            const error = new ApiError(400, 'query/not-found', 'document not found');
            return new NextResponse(JSON.stringify(error.json), {
                status: error.code,
            });
        } catch (error) {
            return new NextResponse(JSON.stringify({ error: 'Internal server error', details: error }), {
                status: 500,
            });
        }
    }

    public async updateOneDocument(databaseName: string, collectionName: string, id: string, updatedDocument: UpdateFilter<JSON>): Promise<any> {
        try {
            const updateDocument = await new Documents().updateOneDocument(databaseName, collectionName, id, updatedDocument, );
            return updateDocument;
        } catch (error) {
            throw error;
        }   
    }
}