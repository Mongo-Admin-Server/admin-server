import { UserController } from "@/api/src/Controller/UserController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const connection_url = req.headers.get('connection_url');
  if (!connection_url) {
    return new NextResponse(
      'You are not logged in, please provide token to gain access',
      {
        status: 401,
      }
    );
  }

  const { users, total } = await new UserController().getUsers(connection_url);
  return new NextResponse(JSON.stringify({ users, total }), {
    status: 200,
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
  const { username, password, roles } = body;
  const created = await new UserController().createUser(
    connection_url,
    username,
    password,
    roles
  );

  return new NextResponse(JSON.stringify(created), {
    status: 200,
  });
}

export async function PUT(req: NextRequest) {
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
  const { username, roles } = body;

  const granted = await new UserController().grantRoles(
    connection_url,
    username,
    roles
  );
  
  return new NextResponse(JSON.stringify(granted), {
    status: 200,
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
  const { username } = body;

  const deleted = await new UserController().deleteUser(
    connection_url,
    username
  );

  return new NextResponse(JSON.stringify(deleted), {
    status: 200,
  });
}