import { DocumentController } from "@/api/src/Controller/DocumentController";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string, id: string } }) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new Response(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const document = await new DocumentController().getOneDocument(connection_url, params.databaseName, params.collectionName, params.id);
  return new Response(JSON.stringify(document), {
    status: 200,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string, id: string } }) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new Response(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const deleteDocument = await new DocumentController().deleteOneDocument(connection_url, params.databaseName, params.collectionName, params.id);
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
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new Response(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const updateDocument = await new DocumentController().updateOneDocument(connection_url, params.databaseName, params.collectionName, params.id, body);
  if (updateDocument.acknowledged === true && updateDocument.modifiedCount === 1) {
    return new Response(JSON.stringify(true), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(false), {
    status: 500,
  });
}