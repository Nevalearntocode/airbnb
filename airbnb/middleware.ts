import { withAuth } from "next-auth/middleware";
import { PublicRoutes, ApiRoutePrefix, AuthRoutes } from "./routes";

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.nextauth.token;

    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    // const isApiAuthRoute = nextUrl.pathname.startsWith(ApiRoutePrefix);
    // const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

    if (!isPublicRoute && !isLoggedIn) {
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
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
