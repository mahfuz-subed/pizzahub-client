"use client"

import toast from "react-hot-toast"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Placeholder for the Stripe Checkout button.
 * When Stripe is added, replace the onClick body with a call that creates a
 * checkout session, then redirect the vendor to the URL Stripe returns.
 */
export function PayButton() {
  function handlePay() {
    toast("Stripe checkout will be connected here.")
  }

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          onClick={handlePay}
          size="lg"
          className="w-full"
        >
          <CreditCard className="size-4" />
          Pay with Stripe
        </Button>
      </section>
    </form>
  )
}
