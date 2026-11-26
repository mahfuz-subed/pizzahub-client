import Link from "next/link"
import { redirect } from "next/navigation"
import { Check, Crown } from "lucide-react"

import { getSession } from "@/lib/core/server"
import { getVendorSubscription } from "@/lib/subscription"
import type { SubscriptionPlan } from "@/lib/subscription"
import { cn } from "@/lib/utils"

// All plan content lives here. To change a feature, edit one line.
const plans: {
  name: string
  plan: SubscriptionPlan
  description: string
  features: string[]
}[] = [
  {
    name: "Free",
    plan: "free",
    description: "Everything you need to start selling pizza.",
    features: [
      "Up to 3 active menu items",
      "Basic vendor dashboard",
      "Order management",
    ],
  },
  {
    name: "Premium",
    plan: "premium",
    description: "More room to grow and stand out on PizzaHub.",
    features: [
      "Unlimited active menu items",
      "Premium vendor badge",
      "Featured placement on the homepage",
      "All Free features",
    ],
  },
]

export default async function SubscriptionPage() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }

  const { plan, isPremium, expiresAt } = await getVendorSubscription()

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Your plan
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Subscription
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose how many pizzas you can publish and how your shop appears.
      </p>

      {/* Current plan banner */}
      <div
        className={cn(
          "mt-6 flex items-center gap-3 rounded-xl border p-4",
          isPremium
            ? "border-secondary bg-secondary/10"
            : "border-border bg-muted/30"
        )}
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            isPremium
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary/10 text-primary"
          )}
        >
          <Crown className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold capitalize">
            Current plan: {plan}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPremium
              ? "You have access to all Premium features."
              : "Free plan: up to 3 active menu items."}
          </p>
        </div>
      </div>

      {/* Extra details shown only to Premium vendors */}
      {isPremium && (
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-secondary/50 bg-card px-4 py-3 text-sm">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <Crown className="size-4" />
            Premium active
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Check className="size-4" />
            Unlimited active menu items
          </span>
          {expiresAt && (
            <span className="text-xs text-muted-foreground">
              Valid until {new Date(expiresAt).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {/* The two plans, built from the array above */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {plans.map((item) => {
          const isCurrent = item.plan === plan

          return (
            <div
              key={item.plan}
              className={cn(
                "flex h-full flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
                item.plan === "premium" && "border-secondary/50"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-xl font-bold">{item.name}</h2>
                {isCurrent && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                    Current plan
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>

              <ul className="mt-5 flex-1 space-y-3">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {item.plan === "premium" && !isPremium ? (
                  <Link
                    href="/payment"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Crown className="size-4" />
                    Upgrade to Premium
                  </Link>
                ) : (
                  <p className="text-center text-xs text-muted-foreground">
                    {isCurrent
                      ? "This is your current plan."
                      : "You already have Premium."}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
