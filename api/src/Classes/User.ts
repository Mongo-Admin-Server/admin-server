import { Admin, Db, MongoClient, MongoServerError } from "mongodb";
import { Instance } from "./Instance";
import { GrantRole, RevokeRole, UserType } from '@/domain/entities/user-types';
import { ApiError } from "./Errors/ApiError";

export default class User{
    public async getUsers(databaseName: string | string[] | undefined, connection_url: string) {
        const client = await Instance.connection(connection_url);
        if(Array.isArray(databaseName) || databaseName === undefined){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else {
            try {
                const users = await client.db(databaseName).collection('system.users').find({}).toArray();
                return users;
            } catch(error) {
                throw(error);
            } 
        }
    }

    public async createUser(databaseName: string | string[] | undefined, user: UserType, connection_url:string) {
        const client = await Instance.connection(connection_url);
        if(Array.isArray(databaseName) || databaseName === undefined){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(user === undefined) {
            throw new ApiError(400, 'query/invalid', 'the user is incorrect');
        } else {
            try {
                const newUser = await client.db(databaseName).command(user);
                return newUser;
            } catch(error) {
                throw(error);
            }
        }
    }

    public async grantRoles(databaseName: string | string[] | undefined, role: GrantRole, connection_url:string) {
        const client = await Instance.connection(connection_url);
        if(Array.isArray(databaseName) || databaseName === undefined){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(role === undefined) {
            throw new ApiError(400, 'query/invalid', 'the role is incorrect');
        } else {
            try {
                const roles = client.db(databaseName).command(role)
                return roles;
            } catch(error){
                throw(error);
            }
        }
    }

    public async deleteUser(databaseName: string | string[] | undefined, user: string | string[] | undefined, connection_url:string) {
        const client = await Instance.connection(connection_url);
        if(Array.isArray(databaseName) || databaseName === undefined){
            throw new ApiError(400, 'query/invalid', 'the database name is incorrect');
        } else if(Array.isArray(user) || user === undefined) {
            throw new ApiError(400, 'query/invalid', 'the user name is incorrect');
        } else {
            try {
                const userToDrop = client.db(databaseName).command({
                    dropUser: user
                });
                return userToDrop;
            } catch(error) {
                throw(error);
            }
        }        
    }

    public async deleteRole(databaseName: string | string[] | undefined, role: RevokeRole, connection_url:string) {
        const client = await Instance.connection(connection_url);
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