import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (!auth && pathname !== "/sign-in") {
        return NextResponse.redirect(
          new URL("/sign-in", request.nextUrl)
        );
      }

      if (auth && pathname === "/sign-in") {
        const role = auth.user?.role;

        if (role === "admin") {
          return NextResponse.redirect(
            new URL("/dashboard/home", request.nextUrl)
          );
        }

        if (role === "guru") {
          return NextResponse.redirect(
            new URL("/dashboard/home", request.nextUrl)
          );
        }

        if (role === "siswa") {
          return NextResponse.redirect(
            new URL("/dashboard/home", request.nextUrl)
          );
        }

        return true;
      }

      if (pathname.startsWith("/dashboard") && !auth) {
        return false;
      }

      // Role-based access (opsional)
      // const role = auth?.user?.userGroup;
      // if (pathname.startsWith("/dashboard/admin")) return role === "admin";
      // if (pathname.startsWith("/dashboard/guru")) return role === "guru";
      // if (pathname.startsWith("/dashboard/siswa")) return role === "siswa";

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|uploads).*)",
  ],
};
