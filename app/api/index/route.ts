import { NextRequest, NextResponse } from "next/server";
import { Index } from "@/api/src/Classes/Index";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const { databaseName, collectionName,  field, unique} = body;
        const indexCreated = await new Index().createIndex(databaseName, collectionName, field, unique);
        return new NextResponse(JSON.stringify(indexCreated), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }catch(error){
        return new NextResponse(JSON.stringify({error: 'Internal server error', details: error}), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    } 
}