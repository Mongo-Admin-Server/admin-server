import { NextRequest, NextResponse } from "next/server";

import { CollectionController } from "@/api/src/Controller/CollectionController";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { databaseName, collectionName } = body;
  const created = await new CollectionController().addOneCollection(databaseName, collectionName);
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
  const body = await req.json();
  const { databaseName, collectionName } = body;
  const deleted = await new CollectionController().deleteOneCollection(databaseName, collectionName);
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