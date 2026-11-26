import { getSession } from "@/lib/core/server"

export type SubscriptionPlan = "free" | "premium"

export interface VendorSubscription {
  plan: SubscriptionPlan
  expiresAt: string | null
  isPremium: boolean
}

/**
 * Reads the logged-in vendor's subscription from the Better Auth session.
 * The extra fields (subscriptionPlan, subscriptionExpiresAt) are defined in
 * lib/auth.ts, so they come back with the user on the session object.
 *
 * Returns `free` as a safe default in case a field is missing.
 */
export async function getVendorSubscription(): Promise<VendorSubscription> {
  const session = await getSession()
  const user = session?.user

  const plan: SubscriptionPlan =
    (user as { subscriptionPlan?: string } | undefined)?.subscriptionPlan ===
    "premium"
      ? "premium"
      : "free"

  const expiresAt =
    (user as { subscriptionExpiresAt?: string | null } | undefined)
      ?.subscriptionExpiresAt ?? null

  return {
    plan,
    expiresAt,
    isPremium: plan === "premium",
  }
}
