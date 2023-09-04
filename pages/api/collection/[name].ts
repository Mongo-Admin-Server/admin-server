import { CollectionController } from "@/api/src/Controller/CollectionController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const collectionController = new CollectionController();
                if(typeof req.query.name === "string") {
                    collectionController.getOneCollection(res, req.query.name);
                }
            } catch (error) {
                res.status(500).json('error');
            }
            break;
            case 'POST':
                try {
                    const collectionController = new CollectionController();
                    if(typeof req.query.name === "string" &&typeof req.query.collectionName === "string" ) {
                        collectionController.addOneCollection(res, req.query.name, req.query.collectionName);
                    }
                } catch (error) {
                    res.status(500).json('error');
                }
                break;
            case 'DELETE':
                try {
                    const collectionController = new CollectionController();
                    if(typeof req.query.name === "string" &&typeof req.query.collectionName === "string" ) {
                        collectionController.deleteOneCollection(res, req.query.name, req.query.collectionName);
                    }
                } catch (error) {
                    res.status(500).json('error');
                }
                break;
        default:
            res.status(405).end();
    }
}