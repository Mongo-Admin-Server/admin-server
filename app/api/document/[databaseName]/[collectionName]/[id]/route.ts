import { DocumentController } from "@/api/src/Controller/DocumentController";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string, id: string } }) {

  const document = await new DocumentController().getOneDocument(params.databaseName, params.collectionName, params.id);
  return new Response(JSON.stringify(document), {
    status: 200,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string, id: string } }) {

  const deleteDocument = await new DocumentController().deleteOneDocument(params.databaseName, params.collectionName, params.id);
  if (deleteDocument.acknowledged === true && deleteDocument.deletedCount === 1) {
    return new Response(JSON.stringify(true), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(false), {
    status: 500,
  });
}

export async function PUT(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string, id: string } }) {

  const body = await req.json();
  const updateDocument = await new DocumentController().updateOneDocument(params.databaseName, params.collectionName, params.id, body);
  if (updateDocument.acknowledged === true && updateDocument.modifiedCount === 1) {
    return new Response(JSON.stringify(true), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(false), {
    status: 500,
  });
}