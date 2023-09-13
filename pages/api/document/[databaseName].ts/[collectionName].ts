import { DocumentController } from "@/api/src/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestIndexDocument } from "@/domain/entities/document-types";

export default function handler(req: RequestIndexDocument, res: NextApiResponse){
    
    const documents = new DocumentController();
    switch(req.method){
        case 'GET':
            documents.getAllDocumentsByCollection(res, req);
            break;
        case 'POST':
            if(documents && req.query.databaseName && req.query.collectionName && req.body) {
                documents.addOneDocument(res, req.query.databaseName, req.query.collectionName, req.body);
            }
            break;
        default:
            return 'Method not found';
    }
}