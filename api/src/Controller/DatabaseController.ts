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
        const { databaseName } = request.query;
        if(!databaseName) 
            response.send(new ApiError(400, 'query/not-found', 'database_name_not_found'));
        const status = await new Database().dropDatabase(databaseName);
        response.status(200).json(status);
    }
}