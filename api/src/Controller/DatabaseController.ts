import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { Database } from "../Classes/Database";
import { NextApiResponse, NextApiRequest } from "next";


export class DatabaseController{
    public async getDatabases(request: RequestCustomHeaders,response: NextApiResponse){
        try{
            const { connection_url } = request.headers
            const databases = await new Database().listDatabase(connection_url);
            response.status(200).json(databases)
        }catch(error){
            response.status(500).json('error');
        }
    }

    public async createDatabase(request:RequestCustomHeaders, response: NextApiResponse){
        try{
            const { databaseName, collectionName } = request.body;
            const { connection_url } = request.headers;

            const created = await new Database().createDatabase(databaseName, collectionName, connection_url);
            if(created === true)
                response.status(200).json(created);
            else
                response.status(created.code).json(created.json)
        }catch(error){
            response.status(500).json('error');
        }
    }

    public async deleteDatabase(request: RequestCustomHeaders, response: NextApiResponse){
        const { databaseName } = request.query
        const { connection_url } = request.headers
        const status = await new Database().dropDatabase(databaseName, connection_url);
        if(status === true)
            response.status(200).json(status);
        else if(status === false)
            response.status(500);
        else
            response.status(status.code).json(status.json)
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