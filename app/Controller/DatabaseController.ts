import { Database } from "../Classes/Database";
import { NextApiResponse } from "next";

export class DatabaseController{
    public async getDatabases(response: NextApiResponse){
        let databases = await new Database().listDatabase();
        response.status(200).json({
            status: 'success',
            data: databases.databases
        });
    }
}