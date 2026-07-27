import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!user && !isLoginPage) {
      // Not logged in and trying to access an admin route
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    
    if (user && isLoginPage) {
      // Logged in but trying to access login page
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
