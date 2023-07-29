import { DocumentController } from "@/app/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            new DocumentController().getAllDocuments(res);
            break;
        default:
            return 'Method not found';
    }
}