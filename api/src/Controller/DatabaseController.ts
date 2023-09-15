import { Database } from "../Classes/Database";
import { NextApiResponse, NextApiRequest } from "next";
import { ApiError } from "../Classes/Errors/ApiError";


export class DatabaseController{
    public async getDatabases(response: NextApiResponse){
        const databases = await new Database().listDatabase();
        response.status(200).json(databases)
    }

    public async createDatabase(request:NextApiRequest, response: NextApiResponse){
        const { databaseName } = request.body;
        const { collectionName } = request.body;
        const res = await new Database().createDatabase(databaseName, collectionName);
        
        if(res === true)
            response.status(200).json(res);
        else
            response.status(res.code).json(res.json)
    }

    public async deleteDatabase(request: NextApiRequest, response: NextApiResponse){
        const { databaseName } = request.query
        const status = await new Database().dropDatabase(databaseName);
        if(status === true)
            response.status(200).json(status);
        else if(status === false)
            response.status(500);
        else
            response.status(status.code).json(status.json)
    }

    public async exportDatabase(request:NextApiRequest, response: NextApiResponse){
        const { databaseName } = request.body;
        const { fileName } = request.body;
        const { extension } = request.body;
        const res = await new Database().exportDatabaseToJson(databaseName, fileName, extension);
        
        if(res === true)
        try {
            response.status(200).json(res);
        } catch (error) {
            response.status(500).json('error');
        }
    }
}