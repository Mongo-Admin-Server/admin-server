import { NextRequest, NextResponse } from "next/server";

import { CollectionController } from "@/api/src/Controller/CollectionController";

export async function POST(req: NextRequest) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new NextResponse(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const { databaseName, collectionName } = body;
  const created = await new CollectionController().addOneCollection(connection_url, databaseName, collectionName);
  if (created === true)
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
}

export async function DELETE(req: NextRequest) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new NextResponse(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const { databaseName, collectionName } = body;
  const deleted = await new CollectionController().deleteOneCollection(connection_url, databaseName, collectionName);
  if (deleted === true)
    return new NextResponse(JSON.stringify(deleted), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  else
    return new NextResponse(JSON.stringify(deleted.json), {
      status: deleted.code,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}