import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
// Type-only: importing auth as a value would pull MongoDB into the browser bundle.
import type { auth } from "./auth"
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  // Copies the extra user fields from auth.ts (role, isBlocked, ...) into the client's types
  plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
