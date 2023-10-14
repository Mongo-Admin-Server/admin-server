import { NextApiResponse } from "next";
import User from "../Classes/User";
import { RevokeRole, RoleType } from "@/domain/entities/user-types";
import { RequestCustomHeaders } from "@/domain/entities/headers-types";

export class UserController{
    public async getUsers() {
        const { users, total } = await new User().getUsers();
        return { users, total };
    }

    public async createUser(username: string, password: string, roles: RoleType[]){
        const created = await new User().createUser(username, password, roles);
        return created;
    }

    public async grantRoles(username: string, role: RoleType[]){
        const rolesToGrant = await new User().grantRoles(username, role);
        return rolesToGrant;
    }

    public async deleteUser(username: string) {
        const deleted = await new User().deleteUser(username);
        return deleted;
    }

    public async deleteRole(databaseName: string, role: RevokeRole) {
        const rolesToDelete = await new User().deleteRole(databaseName, role);
        return rolesToDelete;
    }
}