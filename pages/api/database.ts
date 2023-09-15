import { DatabaseController } from "@/api/src/Controller/DatabaseController";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { NextApiResponse,NextApiRequest } from "next";

export default async function handler(req:RequestCustomHeaders, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            await new DatabaseController().getDatabases(req,res);
            break;
        case 'POST':
            await new DatabaseController().createDatabase(req, res);
            break;
        case 'DELETE':
            await new DatabaseController().deleteDatabase(req,res);
            break;
    }
}