import { headers } from "next/headers"

const COOKIE_NAME = "better-auth.session_token"

/**
 * Better Auth cookie format: token.signature
 * The raw token (before the dot) is what is stored in the session collection.
 */
export function extractToken(cookieValue: string | undefined) {
  if (!cookieValue) return null
  const raw = decodeURIComponent(cookieValue)
  const token = raw.split(".")[0]
  return token || null
}

/** For server components: read the cookie from the request headers. */
export async function getSessionTokenFromHeaders() {
  const headerList = await headers()
  const cookie = headerList.get("cookie") ?? ""
  const match = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
  return extractToken(match?.split("=").slice(1).join("="))
}
