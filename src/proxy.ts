import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request:NextRequest){
const pathName=request.nextUrl.pathname

    let isAuthenticated=false
    let isAdmin=false
    let isTutor=false

    const {data}=await userService.getSession()

    if (data) {
       isAuthenticated=true
       isAdmin=data.user.role===Roles.admin 
       isTutor=data.user.role===Roles.tutor
    }
if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login",request.url))
}

if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL ("/admin",request.url))
}
if (isTutor && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL ("/tutor/dashboard",request.url))
}

    return NextResponse.next()
}

export const config={
    matcher:["/dashboard","/dashboard/:path*","/admin","/admin/:path*"]
}