import { DatabaseController } from "@/api/src/Controller/DatabaseController";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { NextApiResponse,NextApiRequest } from "next";

export default async function handler(req:RequestCustomHeaders, res: NextApiResponse){
    switch(req.method){
        case 'POST':
            await new DatabaseController().exportDatabase(req, res);
            break;
    }
}