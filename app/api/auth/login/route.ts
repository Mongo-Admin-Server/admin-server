import { ApiError } from "@/api/src/Classes/Errors/ApiError";
import { AuthController } from "@/api/src/Controller/AuthController";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // eslint-disable-next-line no-useless-escape
    const urlRegex = /mongodb\+srv:\/\/(?:(?:[^:]+):(?:[^@]+)?@)?(?:(?:(?:[^\/]+)|(?:\/.+.sock?),?)+)(?:\/([^\/\.\ "*<>:\|\?]*))?(?:\?(?:(.+=.+)&?)+)*/;
    if (!urlRegex.test(body.connection_url)) return new ApiError(400, 'auth/invalid-credentials',"Invalid connection URL");

    const { token } = await new AuthController().login(body.connection_url);
    return new NextResponse(
      JSON.stringify({token: token}),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000;`
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors du login : ", error);
    return new ApiError(500, 'auth/invalid-credentials', "Error while logging in");
  }
}