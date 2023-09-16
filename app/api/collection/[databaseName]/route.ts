import { NextRequest, NextResponse } from "next/server";

import { CollectionController } from "@/api/src/Controller/CollectionController";

export async function GET(req: NextRequest, { params }: { params: { databaseName: string } }) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new NextResponse(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const collections = await new CollectionController().getOneCollection(connection_url, params.databaseName);
  return new NextResponse(JSON.stringify(collections), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}