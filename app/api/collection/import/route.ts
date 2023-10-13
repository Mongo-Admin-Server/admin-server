import { NextRequest, NextResponse } from "next/server";
import { Collection } from "@/api/src/Classes/Collection";

export async function POST(request: NextRequest, response: NextResponse){
    const body = await request.json();
    const { databaseName, fileName, collectionName } = body;
    const imported = await new Collection().importDataToCollection(databaseName, fileName, collectionName);
    if(imported)
        return new NextResponse(JSON.stringify(imported), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    return new NextResponse(JSON.stringify(false), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
    });  
}