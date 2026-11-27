import Link from "next/link"
import { ArrowLeft, XCircle } from "lucide-react"

const linkClasses =
  "inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"

export default function PaymentCancelPage() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <XCircle className="size-6" />
          </span>

          <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight">
            Payment cancelled
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            No charges were made. You can go back to the subscription page and
            try again whenever you are ready.
          </p>

          <Link href="/payment" className={`${linkClasses} mt-7 w-full`}>
            <ArrowLeft className="size-4" />
            Back to payment
          </Link>
        </div>
      </div>
    </section>
  )
}
