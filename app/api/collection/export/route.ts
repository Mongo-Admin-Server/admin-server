import { NextRequest, NextResponse } from "next/server";
import { Collection } from "@/api/src/Classes/Collection";

export async function POST(request: NextRequest, response: NextResponse){
    const body = await request.json();
    const { databaseName, fileName, collectionName, extension } = body;
    const exported = await new Collection().exportCollectionDataToJson(databaseName, fileName, extension, collectionName);
    if(exported)
        return new NextResponse(JSON.stringify(exported), {
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