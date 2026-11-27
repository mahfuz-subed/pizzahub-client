import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { auth } from "@/lib/auth"

/**
 * Runs before private pages are rendered.
 * 1. Logged-out visitors go to Sign In (with the page they wanted saved).
 * 2. Each dashboard only opens for its own role.
 */
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  const user = session?.user
  const pathname = request.nextUrl.pathname

  // Not logged in -> sign in, then come back to this page.
  if (!user) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirectTo", pathname + request.nextUrl.search)
    return NextResponse.redirect(signInUrl)
  }

  // Blocked users cannot use protected features.
  if (user.isBlocked) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Only the matching role may open each dashboard.
  // Older users were created before the role field existed; Better Auth
  // defaults them to customer, so the proxy does the same.
  const role = ((user as { role?: string }).role ?? "customer") as
    | "admin"
    | "vendor"
    | "customer"
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/dashboard/vendor") && role !== "vendor") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (pathname.startsWith("/dashboard/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  // Only private pages. Public pages, APIs, and static files are untouched.
  matcher: [
    "/dashboard/:path*",
    "/menu-details/:path*",
    "/payment/:path*",
  ],
}
