import { Instance } from "./Instance";
import { GrantRole, RevokeRole, RoleType } from '@/domain/entities/user-types';
import { ApiError } from "./Errors/ApiError";

export default class User{
    public async getUsers() {
        const client = Instance.Connection;
        try {
            const users = await client.db('admin').collection('system.users').find({}).toArray();
            const total = users.length;
            return { users, total };
        } catch(error) {
            throw error;
        } finally {
            await client.close();
        }
    }

    public async createUser(username: string, password: string, roles: RoleType[]) {
        const client = Instance.Connection;
        try {
            await client.db('admin').addUser(username, password, { roles });
            return true;
        } catch(error) {
            throw error;
        } finally {
            await client.close();
        }
    }

    public async grantRoles(username: string, role: RoleType[]) {
        const client = Instance.Connection;
        try {
            const grandRole: GrantRole = {
                grantRolesToUser: username,
                roles: role
            }
            await client.db('admin').command(grandRole);
            return true;
        } catch(error){
            throw(error);
        } finally {
            await client.close();
        }
    }

    public async deleteUser(username: string) {
        const client = Instance.Connection;
        try {
            await client.db('admin').removeUser(username);
            return true;
        } catch(error) {
            throw error;
        } finally {
            await client.close();
        }     
    }

    public async deleteRole(databaseName: string | string[] | undefined, role: RevokeRole) {
        const client = Instance.Connection;
        if(Array.isArray(databaseName) || databaseName === undefined){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else {
            try {
                const roles = client.db(databaseName).command(role)
                return roles;
            } catch(error){
                throw(error);
            }
        }
    }
}