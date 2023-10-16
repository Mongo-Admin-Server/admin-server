import { RequestCustomHeaders } from "@/domain/entities/headers-types";
import { Database } from "../Classes/Database";
import { NextApiResponse, NextApiRequest } from "next";
import { NextResponse } from "next/server";

export class DatabaseController{
    public async getDatabases(){
        try{
            const { rows } = await new Database().listDatabase();
            return rows;
        }catch(error){
            throw error;
        }
    }

    public async createDatabase(databaseName: string, collectionName: string){
        try{
            const created = await new Database().createDatabase(databaseName, collectionName);
            if(created === true)
                return new NextResponse(JSON.stringify(created), {
                    status: 200,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
            else
                return new NextResponse(JSON.stringify(created.json), {
                    status: created.code,
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
        }catch(error){
            return new NextResponse(JSON.stringify({error: 'Internal server error'}), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        }
    }

    public async deleteDatabase(databaseName: string){
        try {
            const deleted = await new Database().dropDatabase(databaseName);
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
            const exported = await new Database().exportDatabaseToJson(databaseName, fileName, extension);
            response.status(200).json(exported);
        } catch (error) {
            response.status(500).json('error');
        }
    }
}