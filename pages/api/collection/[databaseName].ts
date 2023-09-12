import { CollectionController } from "@/api/src/Controller/CollectionController";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestCustomCollection } from "@/domain/entities/collection-types";

export default function handler(req: RequestCustomCollection, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const collectionController = new CollectionController();
                collectionController.getOneCollection(res, req.query.databaseName);
            } catch (error) {
                res.status(500).json('error');
            }
        break;
        default:
            res.status(405).end();
    }
}