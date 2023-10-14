import { NextRequest, NextResponse } from "next/server";

import { CollectionController } from "@/api/src/Controller/CollectionController";

export async function GET(req: NextRequest, { params }: { params: { databaseName: string } }) {

  const collections = await new CollectionController().getOneCollection(params.databaseName);
  return new NextResponse(JSON.stringify(collections), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}