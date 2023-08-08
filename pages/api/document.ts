import { DocumentController } from "@/app/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations
            const documents = new DocumentController();
            if(documents) {
                documents.getAllDocuments(res);
            }            
            break;
        default:
            return 'Method not found';
    }
}