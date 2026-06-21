import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET 
  });

  const isOnCheckout = req.nextUrl.pathname.startsWith("/users/checkout");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  // Only check if user is logged in, NOT the role
  // Role checking happens in the server component
  if (isOnCheckout && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isOnAdmin && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/users/checkout", "/admin/:path*"],
};