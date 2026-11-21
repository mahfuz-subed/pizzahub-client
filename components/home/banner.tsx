import Link from "next/link"
import { ArrowRight } from "lucide-react"

import PizzeriaIllustration from "@/components/home/pizzeria-illustration"

/** The primary call-to-action style, shared with the navbar buttons. */
const buttonLinkClasses =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"

export default function Banner() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Text side */}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-secondary">
            <span className="size-2 rounded-full bg-secondary" />
            Your neighborhood pizzeria
          </p>

          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hot &amp; fresh pizza, delivered to your door
            <span className="text-secondary">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Browse menus from local pizza shops, pick your favorites, and leave
            the cooking to us. Good pizza, good people, right on time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/menu" className={buttonLinkClasses}>
              Explore Pizza Menu
              <ArrowRight className="size-4" />
            </Link>
            <p className="text-sm text-muted-foreground">
              No account needed to browse.
            </p>
          </div>
        </div>

        {/* Illustration side */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-x-6 bottom-4 h-10 rounded-full bg-secondary/20 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/10 p-4 sm:p-6">
            <PizzeriaIllustration className="h-auto w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
