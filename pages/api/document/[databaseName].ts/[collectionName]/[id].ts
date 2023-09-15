import { DocumentController } from "@/api/src/Controller/DocumentController";
import { RequestIndexDocument } from "@/domain/entities/document-types";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: RequestIndexDocument, res: NextApiResponse){
    
    const document = new DocumentController();
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations    
            document.getOneDocument(res, req);
            break;
        case 'DELETE':
            document.DeleteOneDocument(res, req);
            break;
        case 'PUT':
            document.UpdateOneDocument(res,req);
            break;
        default:
            return 'Method not found';
    }
}