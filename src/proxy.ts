import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

function redirectByRole(role: string, request: NextRequest) {
  if (role === Roles.admin)
    return NextResponse.redirect(new URL("/admin", request.url));
  if (role === Roles.tutor)
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  // Students stay on /dashboard
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  if (!data) {
    // Not logged in → login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // 🎯 Entry /dashboard redirect
  if (pathName === "/dashboard") {
    if (role === Roles.admin)
      return NextResponse.redirect(new URL("/admin", request.url));
    if (role === Roles.tutor)
      return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    return NextResponse.next(); 
  }

  // 🚫 Admin protection
  if (pathName.startsWith("/admin") && role !== Roles.admin) {
    return redirectByRole(role, request);
  }

  // 🚫 Tutor protection
  if (pathName.startsWith("/tutor") && role !== Roles.tutor) {
    return redirectByRole(role, request);
  }

  // 🚫 Student protection: prevent access to anything except /dashboard
  if (role === Roles.student && pathName !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/tutor",
    "/tutor/:path*",
  ],
};
