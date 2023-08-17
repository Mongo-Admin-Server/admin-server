import { DatabaseController } from "@/api/src/Controller/DatabaseController";
import { NextApiResponse } from "next";

export default async function handler(req:Request, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            await new DatabaseController().getDatabases(res);
            break;
    }
}