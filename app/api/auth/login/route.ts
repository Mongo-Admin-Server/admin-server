import { AuthController } from '@/api/src/Controller/AuthController';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /mongodb\+srv:\/\/(?:(?:[^:]+):(?:[^@]+)?@)?(?:(?:(?:[^\/]+)|(?:\/.+.sock?),?)+)(?:\/([^\/\.\ "*<>:\|\?]*))?(?:\?(?:(.+=.+)&?)+)*/;
    if (!urlRegex.test(body.connection_url))
      return new NextResponse(
        JSON.stringify({ error: 'Invalid connection url' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

    const { token } = await new AuthController().login(body.connection_url);
    return new NextResponse(JSON.stringify({ token: token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000;`,
      },
    });
  } catch (error) {
    console.error('Erreur lors du login : ', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error while logging in' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
