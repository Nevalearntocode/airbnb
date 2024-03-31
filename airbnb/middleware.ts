import { withAuth } from 'next-auth/middleware';
import {
  PublicRoutes,
  ApiRoutePrefix,
  AuthRoutes,
  ProtectedRoutes,
} from './routes';

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    // check if user is logged in by the existence of token
    const isLoggedIn = !!req.nextauth.token;

    const isPublicRoute =
      PublicRoutes.includes(nextUrl.pathname) ||
      nextUrl.pathname.startsWith('/listings/');
    const isApiAuthRoute = nextUrl.pathname.startsWith(ApiRoutePrefix);
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);
    const isProtectedRoute =
      ProtectedRoutes.includes(nextUrl.pathname) ||
      nextUrl.pathname.startsWith('/api/listings');
    if (isAuthRoute) {
      return null;
    }

    if (isApiAuthRoute) {
      return null;
    }
    // if user is not logged in and url is not a public route, redirect user to `/`
    if (!isPublicRoute && !isLoggedIn) {
      return Response.redirect(new URL(`/`, nextUrl));
    }
    // if user is logged in and route doesn't exits, redirect user to homepage
    if (!isProtectedRoute && !isPublicRoute && isLoggedIn) {
      return Response.redirect(new URL(`/`, nextUrl));
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
