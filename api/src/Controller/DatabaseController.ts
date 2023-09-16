import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { Database } from "../Classes/Database";
import { NextApiResponse, NextApiRequest } from "next";


export class DatabaseController{
    public async getDatabases(connection_url: string){
        try{
            const { rows } = await new Database().listDatabase(connection_url);
            return rows;
        }catch(error){
            throw error;
        }
    }

    public async createDatabase(connection_url: string, databaseName: string, collectionName: string){
        try{
            const created = await new Database().createDatabase(databaseName, collectionName, connection_url);
            if(created === true)
                return true;
            else
                return created;
        }catch(error){
            throw error;
        }
    }

    public async deleteDatabase(connection_url: string, databaseName: string){
        try {
            const deleted = await new Database().dropDatabase(databaseName, connection_url);
            if(deleted === true)
                return true;
            else
                return deleted;
        } catch (error) {
            throw error;
        }
    }

    public async exportDatabase(request:RequestCustomHeaders, response: NextApiResponse){
    
        try {
            const { databaseName, fileName, extension } = request.body;
            const { connection_url } = request.headers;
    
            const exported = await new Database().exportDatabaseToJson(databaseName, fileName, extension, connection_url);
            response.status(200).json(exported);
        } catch (error) {
            response.status(500).json('error');
        }
    }
}