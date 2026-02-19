import { NextResponse } from "next/server";
import { createRouteMatcher, clerkMiddleware } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (
    isAdminRoute(req) &&
    (await auth()).userId !== process.env.ADMIN_USER_ID
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
