import { DocumentController } from "@/api/src/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    
    const documents = new DocumentController();
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations
            if(documents && req.query.name && req.query.databaseName) {
                documents.getAllDocumentsByCollection(res, req.query.databaseName, req.query.name);
            }
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