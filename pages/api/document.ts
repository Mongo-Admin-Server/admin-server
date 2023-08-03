import { DocumentController } from "@/app/Controller/DocumentController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            // eslint-disable-next-line no-case-declarations
            const documents = new DocumentController();
            res.send('documents');
            break;
        default:
            return 'Method not found';
    }
}