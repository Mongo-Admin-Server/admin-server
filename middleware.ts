import { jwtVerify } from 'jose'; 
import { ApiError } from '@/api/src/Classes/Errors/ApiError';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
});

interface AuthenticatedRequest extends NextRequest {
    user: {
      connection_url: string;
    };
}

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
      return (
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET_KEY),
        )
      ).payload as T;
    } catch (error) {
      console.log(error);
      throw new Error("Your token has expired.");
    }
  };

let redirectToLogin = false;

export async function middleware(req: NextRequest) {
    let token: string | undefined;

    if (req.nextUrl.pathname.startsWith("/api/auth/login") && (!token || redirectToLogin))
      return;

    if (req.cookies.has("token")) {
      token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
      token = req.headers.get("Authorization")?.substring(7);
    }

    if (
      !token &&
      (req.nextUrl.pathname.startsWith("/api/users") ||
        req.nextUrl.pathname.startsWith("/api/auth/logout"))
    ) {
      return NextResponse.json({
        error: "user not connected"
      },{status: 403})
    }

    const response = NextResponse.next();

    try {
      if (token) {
        const { connection_url } = await verifyJWT<{ connection_url: string}>(token);
        response.headers.set("CONNECTION_URL", connection_url);
        (req as AuthenticatedRequest).user = { connection_url: connection_url };
      }
      
    } catch (error) {
      redirectToLogin = true;
      if (req.nextUrl.pathname.startsWith("/api")) {
        return new ApiError(400, 'auth/invalid-credentials',"Token is invalid or user doesn't exists");
      }

      return NextResponse.redirect(
        new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url)
      );
    }

    const authUser = (req as AuthenticatedRequest).user;

    if (!authUser) {
      // return NextResponse.redirect(
      //   new URL('/fr/login', req.nextUrl.host)
      // );
      return NextResponse.json({
        error: 'user not connected'
      },{
        status: 403
      })
    }

    if (req.url.includes("/login") && authUser) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.host));
    }

    return response;
}


export const config = {
  matcher: ["/api/:path*"],
};
