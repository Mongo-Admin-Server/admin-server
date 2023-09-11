import { UserController } from "@/api/src/Controller/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res: NextApiResponse){
    switch(req.method){
        case 'POST':
            new UserController().login(req,res);
            break;
    }
}