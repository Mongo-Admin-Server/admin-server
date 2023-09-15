import { NextApiResponse, NextApiRequest } from "next";
import User from "../Classes/User";
import { GrantRole, RevokeRole, UserType } from "@/domain/entities/user-types";


export class UserController{
    
    public login(request: NextApiRequest, response: NextApiResponse){
        
        const { connection_url } = request.body
        const { save } = request.body

        const client = new User().login(connection_url);
        if(!client)
            response.status(404).json('error');
        else
            response.status(200).json(true);
    }

    public async getUsers(request: NextApiRequest, response: NextApiResponse, databaseName: string | string[] | undefined){
        const users = await new User().getUsers(databaseName);
        if(!users && !databaseName)
            response.status(404).json('error');
        else
            response.status(200).json(users);
    }

    public async createUser(request: NextApiRequest, response: NextApiResponse, databaseName: string | string[] | undefined, newUser: UserType){
        const user = await new User().createUser(databaseName, newUser);
        if(!user)
            response.status(404).json('error');
        else
            response.status(200).json(user);
    }

    public async grantRoles(request: NextApiRequest, response: NextApiResponse, databaseName: string | string[] | undefined, role: GrantRole){
        const rolesToGrant = await new User().grantRoles(databaseName, role);
        if(!rolesToGrant)
            response.status(404).json('error');
        else
            response.status(200).json(rolesToGrant);
    }

    public async deleteUser(request: NextApiRequest, response: NextApiResponse, databaseName: string | string[] | undefined, user: string| string[] | undefined) {
        const userToDelete = await new User().deleteUser(databaseName, user);
        if(!userToDelete)
            response.status(404).json('error');
        else
            response.status(200).json(userToDelete);
    }

    public async deleteRole(request: NextApiRequest, response: NextApiResponse, databaseName: string | string[] | undefined, role: RevokeRole) {
        const rolesToDelete = await new User().deleteRole(databaseName, role);
        if(!rolesToDelete)
            response.status(404).json('error');
        else
            response.status(200).json(rolesToDelete);
    }
}