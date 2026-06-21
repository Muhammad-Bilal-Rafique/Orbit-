import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isOnCheckout = req.nextUrl.pathname.startsWith("/users/checkout");

  // Only check checkout route
  if (isOnCheckout && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Remove /admin from middleware - let the page handle it
}

export const config = {
  matcher: ["/users/checkout"],  // Remove /admin from here
};