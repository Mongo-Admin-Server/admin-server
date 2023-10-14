import { UserController } from '@/api/src/Controller/UserController';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { users, total } = await new UserController().getUsers();
  return new NextResponse(JSON.stringify({ users, total }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, roles } = body;
  const created = await new UserController().createUser(
    username,
    password,
    roles
  );

  return new NextResponse(JSON.stringify(created), {
    status: 200,
  });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { username, roles } = body;

  const granted = await new UserController().grantRoles(username, roles);

  return new NextResponse(JSON.stringify(granted), {
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { username } = body;

  const deleted = await new UserController().deleteUser(username);

  return new NextResponse(JSON.stringify(deleted), {
    status: 200,
  });
}
