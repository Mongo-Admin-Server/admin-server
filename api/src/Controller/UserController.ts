import { NextApiResponse, NextApiRequest } from "next";
import User from "../Classes/User";
import { GrantRole, RevokeRole, UserType } from "@/domain/entities/user-types";
import { ApiError } from "../Classes/Errors/ApiError";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";

export class UserController{
    public async getUsers(databaseName: string){
        try {
            const users = await new User().getUsers(databaseName);
            if(!users)
                throw new ApiError(400, 'user/fetch-failed', 'Could not fetch the users');

            return users;
        } catch (error) {
            throw error;
        }
    }

    public async createUser(databaseName: string, newUser: UserType){
        try {
            const user = await new User().createUser(databaseName, newUser);
            if(!user)
                throw new ApiError(400, 'user/creation-failed', 'Could not create the user');

            return user;
        } catch (error) {
            throw error;
        }        
    }

    public async grantRoles(databaseName: string, role: GrantRole){
        try {
            const rolesToGrant = await new User().grantRoles(databaseName, role);
            if(!rolesToGrant)
                throw new ApiError(400, 'user/grantRole-failed', 'Could not grant role to the user');

            return rolesToGrant;
        } catch (error) {
            throw error;
        }  
    }

    public async deleteUser(databaseName: string, user: string) {
        try {
            const userToDelete = await new User().deleteUser(databaseName, user);
            if(!userToDelete)
                throw new ApiError(400, 'user/deleting-failed', 'Could not delete the user');

            return userToDelete;
        } catch (error) {
            throw error;
        }  
    }

    public async deleteRole(databaseName: string, role: RevokeRole) {
        try {
            const rolesToDelete = await new User().deleteRole(databaseName, role);
            if(!rolesToDelete)
                throw new ApiError(400, 'user/revokeRole-failed', 'Could not revoke role to the user');

            return rolesToDelete;
        } catch (error) {
            throw error;
        }  
    }
}