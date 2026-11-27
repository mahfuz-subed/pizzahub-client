import Link from "next/link"
import { Compass } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="size-7" />
        </span>

        <p className="mt-6 text-sm font-semibold tracking-wide text-secondary">
          404
        </p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page got lost
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The page you are looking for does not exist, or it has moved. Let us
          get you back to the good stuff.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className={cn(buttonVariants(), "min-w-32")}>
            Back home
          </Link>
          <Link
            href="/menu"
            className={cn(buttonVariants({ variant: "outline" }), "min-w-32")}
          >
            Browse menu
          </Link>
        </div>
      </div>
    </section>
  )
}
