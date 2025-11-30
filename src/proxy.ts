import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
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
