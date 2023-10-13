import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/api/src/Classes/Database";

export async function POST(request: NextRequest, response: NextResponse){
    const body = await request.json();
    const { databaseName, fileName, extension } = body;
    const exported = await new Database().exportDatabaseToJson(databaseName, fileName, extension);
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