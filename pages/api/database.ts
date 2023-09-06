import { DatabaseController } from "@/api/src/Controller/DatabaseController";
import { NextApiResponse,NextApiRequest } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            await new DatabaseController().getDatabases(res);
            break;
        case 'POST':
            await new DatabaseController().createDatabase(req, res);
            break;
        case 'DELETE':
            await new DatabaseController().deleteDatabase(req,res);
            break;
    }
}