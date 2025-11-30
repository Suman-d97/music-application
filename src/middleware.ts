
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // PUBLIC DASHBOARD
// export async function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   // Only /account should require login
//   const isProtected = pathname.startsWith("/account");

//   // Supabase auth cookie
//   const token = req.cookies.get("sb-access-token")?.value;

//   // If user is NOT logged in and trying to access /account → redirect
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }

//   // Everything else is PUBLIC (home, albums, songs, dashboard, etc.)
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/account/:path*",
//   ],
// };










import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create Supabase client inside middleware
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if needed
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const isProtected = pathname.startsWith("/account");

  // If not logged in & accessing protected page → redirect
  if (isProtected && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/signin";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/account/:path*"],
};
