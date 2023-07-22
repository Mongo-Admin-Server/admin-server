import { InstanceController } from "@/app/Controller/InstanceController";
import { NextApiResponse } from "next";

export default function handler(req:Request, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            new InstanceController().connection(res);
            break;
    }
}