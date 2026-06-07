import { NextRequest, NextResponse } from "next/server";

import { Roles } from "./constants/roles";
import { getRoleFromCookies } from "./lib/session";

const AUTH_URL =
  process.env.NEXT_PUBLIC_AUTH_URL ||
  "http://localhost:5000/api/auth";

function redirectByRole(role: string, request: NextRequest) {
  if (role === Roles.admin)
    return NextResponse.redirect(new URL("/admin", request.url));
  if (role === Roles.tutor)
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

export async function proxy(request: NextRequest) {
  try {
    const pathName = request.nextUrl.pathname;
    const cookieHeader =
      request.headers.get("cookie") ?? request.cookies.toString();
    const role = await getRoleFromCookies(cookieHeader, AUTH_URL);

    if (!role) {
      return NextResponse.next();
    }

    if (pathName === "/dashboard") {
      if (role === Roles.admin)
        return NextResponse.redirect(new URL("/admin", request.url));
      if (role === Roles.tutor)
        return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
      return NextResponse.next();
    }

    if (pathName.startsWith("/admin") && role !== Roles.admin) {
      return redirectByRole(role, request);
    }

    if (pathName.startsWith("/tutor") && role !== Roles.tutor) {
      return redirectByRole(role, request);
    }

    if (role === Roles.student && pathName !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/admin",
    "/admin/:path*",
    "/tutor",
    "/tutor/:path*",
  ],
};
