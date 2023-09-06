import { DocumentController } from "@/api/src/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    
    const document = new DocumentController();
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations    
            if(document && req.query.databaseName && req.query.name && req.query.id) {
                document.getOneDocument(res, req.query.databaseName, req.query.name, req.query.id);
            }   
            break;
        case 'DELETE':
            if(document && req.query.databaseName && req.query.name && req.query.id) {
                document.DeleteOneDocument(res, req.query.databaseName, req.query.name, req.query.id);
            }
            break;
        default:
            return 'Method not found';
    }
}