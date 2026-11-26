import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"

/**
 * Server components / server actions: ask Better Auth for a signed JWT.
 * This replaces the old cookie-reading hack.
 */
export async function getServerToken() {
  const token = await auth.api.getToken({ headers: await headers() })
  return token?.token ?? null
}

/** Client components: same JWT through the Better Auth client. */
export async function getClientToken() {
  const { data } = await authClient.token()
  return data?.token ?? null
}
