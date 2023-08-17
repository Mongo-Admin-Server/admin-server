import { CollectionController } from "@/api/src/Controller/CollectionController";
import { NextApiResponse } from "next";

export default function handler(req: Request, res: NextApiResponse) {
    switch (req.method) {
        // case 'GET':
        //     try {
        //         const collectionController = new CollectionController();
        //         collectionController.getCollection(res);
        //     } catch (error) {
        //         res.status(500).json('error');
        //     }
        //     break;
        default:
            res.status(405).end();
    }
}