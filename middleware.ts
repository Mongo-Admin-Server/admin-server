import createMiddleware from 'next-intl/middleware';
// import { NextRequest } from 'next/server';

export default createMiddleware({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
});

// export function middleware(request: NextRequest) {
//   return I18nMiddleware(request);
// }

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
