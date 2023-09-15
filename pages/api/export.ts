import { DatabaseController } from "@/api/src/Controller/DatabaseController";
import { NextApiResponse,NextApiRequest } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'POST':
            await new DatabaseController().exportDatabase(req, res);
            break;
    }
}