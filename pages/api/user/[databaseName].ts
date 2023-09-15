import { UserController } from "@/api/src/Controller/UserController";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:RequestCustomHeaders, res: NextApiResponse){
    switch(req.method){
        case 'GET':
            new UserController().getUsers(req, res, 'admin');
            break;
        case 'POST':
            new UserController().createUser(req,res, req.query.databaseName, req.body);
            break;
        case 'PUT':
            if(req.body.grantRolesToUser) {
                new UserController().grantRoles(req, res, req.query.databaseName, req.body);
            } else {
                new UserController().deleteRole(req, res, req.query.databaseName, req.body)
            }
            break;            
        case 'DELETE':
            new UserController().deleteUser(req, res, req.query.databaseName, req.query.userToDelete);
            break;
        default:
            break;
    }
}