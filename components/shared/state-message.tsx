import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StateMessageProps {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

// Shows a friendly message when there is nothing to display (empty or error)
export function StateMessage({
  title,
  description,
  actionLabel,
  actionHref,
}: StateMessageProps) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <p className="text-lg font-semibold">{title}</p>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
