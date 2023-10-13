import { DatabaseController } from '@/api/src/Controller/DatabaseController';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // const connection_url = req.headers.get('connection_url');
  // if (!connection_url) {
  //   return new NextResponse(
  //     'You are not logged in, please provide token to gain access',
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  const databases = await new DatabaseController().getDatabases();
  return new NextResponse(JSON.stringify(databases), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

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

  const created = await new DatabaseController().createDatabase(
    connection_url,
    databaseName,
    collectionName
  );
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
  const { databaseName } = body;

  const deleted = await new DatabaseController().deleteDatabase(
    connection_url,
    databaseName
  );
  if (deleted)
    return new NextResponse(JSON.stringify(deleted), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  else
    return new NextResponse('Error', {
      status: 204,
      headers: {
        'Content-Type': 'application/json',
      },
    });
}
