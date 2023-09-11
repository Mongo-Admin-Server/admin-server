import { DocumentController } from "@/api/src/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestCustomDocument } from "@/api/src/types/IDocument";

export default function handler(req: RequestCustomDocument, res: NextApiResponse){
    
    const documents = new DocumentController();
    switch(req.method){
        case 'GET':
            documents.getAllDocumentsByCollection(res, req);
            break;
        case 'POST':
            if(documents && req.query.databaseName && req.query.name && req.body) {
                documents.addOneDocument(res, req.query.databaseName, req.query.name, req.body);
            }
            break;
        default:
            return 'Method not found';
    }
}