import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Check, Crown, ShieldCheck } from "lucide-react"

import { PayButton } from "@/components/payment/pay-button"
import { auth } from "@/lib/auth"
import type { Role } from "@/lib/roles"
import toast from "react-hot-toast"

// The perks of the Premium plan (same wording as the vendor Subscription page).
const benefits = [
  "Unlimited active menu items",
  "Premium vendor badge",
  "Featured placement on the homepage",
  "All Free plan features",
]

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled: string }>
}) {
  const { canceled } = await searchParams
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/sign-in?redirectTo=/payment")
  }
  if ((session.user.role as Role) !== "vendor") {
    redirect("/")
  }
  if (canceled) {
    toast.error(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-secondary/20 text-primary">
              <Crown className="size-6" />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight">
                Upgrade to Premium
              </h1>
              <p className="text-sm text-muted-foreground">
                Unlock everything your pizza shop needs with Premium.
              </p>
            </div>
          </div>

          {/* Plan details - the price comes from the Stripe session later */}
          <div className="mt-8 rounded-xl border bg-muted/30 p-5">
            <p className="text-sm font-semibold">PizzaHub Premium</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Recurring subscription, billed securely through Stripe. The exact
              price is shown on the Stripe checkout page.
            </p>
          </div>

          {/* What's included */}
          <ul className="mt-6 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <PayButton />

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-4" />
              Payments are handled securely by Stripe.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
