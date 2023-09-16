import { NextApiResponse, NextApiRequest } from "next";
import User from "../Classes/User";
import { GrantRole, RevokeRole, UserType } from "@/domain/entities/user-types";
import { ApiError } from "../Classes/Errors/ApiError";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";


export class UserController{
    
    public async login(request: NextApiRequest, response: NextApiResponse){
        try{
            const { connection_url } = request.body
            const urlRegex = /mongodb\+srv:\/\/(?:(?:[^:]+):(?:[^@]+)?@)?(?:(?:(?:[^\/]+)|(?:\/.+.sock?),?)+)(?:\/([^\/\.\ "*<>:\|\?]*))?(?:\?(?:(.+=.+)&?)+)*/
            if(!urlRegex){
                const error = new ApiError(400, 'auth/missing-url', 'Incorrect or missing url');
                response.status(error.code).json(error.json);
            }
            response.status(200).json(await new User().login(connection_url));
        }catch(error){
            throw error
        }
        
    }

    public async getUsers(request: RequestCustomHeaders, response: NextApiResponse, databaseName: string | string[] | undefined){
        const { connection_url } = request.headers
        const users = await new User().getUsers(databaseName, connection_url);
        if(!users && !databaseName)
            response.status(404).json('error');
        else
            response.status(200).json(users);
    }

    public async createUser(request: RequestCustomHeaders, response: NextApiResponse, databaseName: string | string[] | undefined, newUser: UserType){
        const { connection_url } = request.headers
        const user = await new User().createUser(databaseName, newUser, connection_url);
        if(!user)
            response.status(404).json('error');
        else
            response.status(200).json(user);
    }

    public async grantRoles(request: RequestCustomHeaders, response: NextApiResponse, databaseName: string | string[] | undefined, role: GrantRole){
        const { connection_url } = request.headers
        const rolesToGrant = await new User().grantRoles(databaseName, role, connection_url);
        if(!rolesToGrant)
            response.status(404).json('error');
        else
            response.status(200).json(rolesToGrant);
    }

    public async deleteUser(request: RequestCustomHeaders, response: NextApiResponse, databaseName: string | string[] | undefined, user: string| string[] | undefined) {
        const { connection_url } = request.headers
        const userToDelete = await new User().deleteUser(databaseName, user, connection_url);
        if(!userToDelete)
            response.status(404).json('error');
        else
            response.status(200).json(userToDelete);
    }

    public async deleteRole(request: RequestCustomHeaders, response: NextApiResponse, databaseName: string | string[] | undefined, role: RevokeRole) {
        const { connection_url } = request.headers
        const rolesToDelete = await new User().deleteRole(databaseName, role, connection_url);
        if(!rolesToDelete)
            response.status(404).json('error');
        else
            response.status(200).json(rolesToDelete);
    }
}