import { CollectionController } from "@/api/src/Controller/CollectionController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            try {
                const collectionController = new CollectionController();
                collectionController.addOneCollection(req, res);
            } catch (error) {
                res.status(500).json('error');
            }
            break;
        case 'DELETE':
            try {
                const collectionController = new CollectionController();
                collectionController.deleteOneCollection(req, res);
            } catch (error) {
                res.status(500).json('error');
            }
            break;
        default:
            res.status(405).end();
    }
}