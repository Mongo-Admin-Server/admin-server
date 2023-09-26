import { NextApiResponse } from "next";
import User from "../Classes/User";
import { RevokeRole, RoleType } from "@/domain/entities/user-types";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";

export class UserController{
    public async getUsers(connection_url: string) {
        const { users, total } = await new User().getUsers(connection_url);
        return { users, total };
    }

    public async createUser(connection_url: string, username: string, password: string, roles: RoleType[]){
        const created = await new User().createUser(connection_url, username, password, roles);
        return created;
    }

    public async grantRoles(connection_url: string, username: string, role: RoleType[]){
        const rolesToGrant = await new User().grantRoles(username, role, connection_url);
        return rolesToGrant;
    }

    public async deleteUser(connection_url: string, username: string) {
        const deleted = await new User().deleteUser(username, connection_url);
        return deleted;
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