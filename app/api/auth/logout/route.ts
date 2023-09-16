import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({}),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;`
      }
    });
}