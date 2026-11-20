import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * The PizzaHub text logo: one solid color with a small accent dot.
 * A text-only treatment keeps it distinct from the demo's two-line logo.
 *
 * Reuse this in the navbar, footer, and dashboards so the brand
 * looks identical everywhere.
 */
type LogoProps = {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="PizzaHub home"
      className={cn(
        "inline-flex items-baseline font-heading text-2xl font-extrabold tracking-tight text-primary",
        className
      )}
    >
      PizzaHub
      <span className="text-secondary">.</span>
    </Link>
  )
}
