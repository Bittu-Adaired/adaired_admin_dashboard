import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("refreshToken")?.value;

  if (path.split("/")[1] !== "auth" && !accessToken) {
    console.log("Access token not found");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (path.split("/")[1] === "auth" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
