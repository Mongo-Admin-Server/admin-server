import { CollectionController } from "@/api/src/Controller/CollectionController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'POST':
            await new CollectionController().exportCollectionData(req, res);
            break;
    }
}