import { NextRequest, NextResponse } from "next/server";
import { Index } from "@/api/src/Classes/Index";

export async function GET(request: NextRequest, {params }: { params: { databaseName: string, collectionName: string }}) {
    try{
        const listIndexes = await new Index().listIndex(params.databaseName, params.collectionName);
        return new NextResponse(JSON.stringify(listIndexes), {
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