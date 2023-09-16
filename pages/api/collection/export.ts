import { CollectionController } from "@/api/src/Controller/CollectionController";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:RequestCustomHeaders, res: NextApiResponse){
    switch(req.method){
        case 'POST':
            await new CollectionController().exportCollectionData(req, res);
            break;
    }
}