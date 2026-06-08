import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isOnCheckout = req.nextUrl.pathname.startsWith("/users/checkout");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  // Check checkout route
  if (isOnCheckout && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Check admin route
  // if (isOnAdmin) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  //   }
  //   if (token.role !== "admin") {
  //     return NextResponse.redirect(new URL("/", req.nextUrl));
  //   }
  // }
}

export const config = {
  matcher: ["/users/checkout", "/admin/:path*"],
};