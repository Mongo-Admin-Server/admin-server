import { DocumentController } from "@/app/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations
            const documents = new DocumentController();
            if(req.query.name) {
                documents.getAllDocuments(res, req.query.name);
            }
            
            break;
        default:
            return 'Method not found';
    }
}