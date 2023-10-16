import { DatabaseController } from '@/api/src/Controller/DatabaseController';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try{
    const databases = await new DatabaseController().getDatabases();
    return new NextResponse(JSON.stringify(databases), {
      status: 200,
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

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const { databaseName, collectionName } = body;

    const created = await new DatabaseController().createDatabase(
      databaseName,
      collectionName
    );
      
  }catch(error){
    return new NextResponse(JSON.stringify({error: 'Internal server error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }   
}

export async function DELETE(req: NextRequest) {
  try{ 
    const body = await req.json();
    const { databaseName } = body;
    const deleted = await new DatabaseController().deleteDatabase(databaseName);
    return new NextResponse(JSON.stringify(deleted), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  catch(error){
    return new NextResponse(JSON.stringify({error: 'Internal server error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
    
}
