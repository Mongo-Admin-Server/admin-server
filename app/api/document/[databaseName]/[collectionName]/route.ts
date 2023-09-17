import { NextRequest } from "next/server";

import { DocumentController } from "@/api/src/Controller/DocumentController";

export async function GET(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string } }) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new Response(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }
  
  const filter = JSON.parse(req.headers.get('filter') || "{}");
  const { perPage, currentPage } = Object.fromEntries(req.nextUrl.searchParams);
  const { documents, total } = await new DocumentController().getAllDocumentsByCollection(connection_url, params.databaseName, params.collectionName, perPage, currentPage, filter);
  return new Response(JSON.stringify({ documents, total }), {
    status: 200,
  });
}

export async function POST(req: NextRequest, { params }: { params: { databaseName: string, collectionName: string } }) {
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
  const newDocument = await new DocumentController().addOneDocument(connection_url, params.databaseName, params.collectionName, body);
  if (newDocument.acknowledged === true && newDocument.insertedId) {
    return new Response(JSON.stringify(true), {
      status: 200,
    });
  }
  return new Response(JSON.stringify(false), {
    status: 500,
  });
}