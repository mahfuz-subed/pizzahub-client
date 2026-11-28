import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type Stripe from "stripe"

import { StateMessage } from "@/components/shared/state-message"

import { stripe } from "@/lib/stripe"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <section className="px-4 py-16">
        <StateMessage
          title="No payment session found"
          description="Open the Upgrade to Premium page to start again."
          actionLabel="Back to payment"
          actionHref="/payment"
        />
      </section>
    )
  }

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    })
  } catch {
    return (
      <section className="px-4 py-16">
        <StateMessage
          title="We could not load this payment"
          description="The session link may be wrong or expired."
          actionLabel="Back to payment"
          actionHref="/payment"
        />
      </section>
    )
  }

  // Checkout was abandoned - send the vendor back to the payment page.
  if (session.status === "open") {
    redirect("/payment")
  }

  // Session exists but is not paid - show a clear message, not blank space.
  if (session.status !== "complete" || session.payment_status !== "paid") {
    return (
      <section className="px-4 py-16">
        <StateMessage
          title="Payment not completed"
          description="This checkout session has not been paid yet."
          actionLabel="Back to payment"
          actionHref="/payment"
        />
      </section>
    )
  }

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" />
          </span>

          <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight">
            Payment Successful!
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Thank you for subscribing to PizzaHub Premium. We're activating your
            subscription now. Your Premium features will be available shortly.
          </p>

          <div className="mt-7 divide-y rounded-xl border bg-muted/30 px-4">
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-semibold">PizzaHub Premium</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-muted-foreground">
                Receipt sent to
              </span>
              <span className="truncate text-sm font-semibold">
                {session.customer_details?.email ?? "your email"}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/vendor"
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Link>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Stripe will email you a receipt for this payment.
          </p>
        </div>
      </div>
    </section>
  )
}
