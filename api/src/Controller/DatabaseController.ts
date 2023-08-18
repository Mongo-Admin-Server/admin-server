import { Database } from "../Classes/Database";
import { NextApiResponse } from "next";

export class DatabaseController{
    public async getDatabases(response: NextApiResponse){
        const databases = await new Database().listDatabase();
        response.status(200).json(databases)
    }
}