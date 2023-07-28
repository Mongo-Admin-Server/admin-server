import { InstanceController } from "@/app/Controller/InstanceController";
import { NextApiResponse } from "next";

export default function handler(req: Request, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const instanceController = new InstanceController();
                instanceController.getCollection(res);
            } catch (error) {
                res.status(500).json('error');
            }
            break;
        default:
            res.status(405).end();
    }
}