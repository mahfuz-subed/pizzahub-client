"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { SafeImage } from "@/components/shared/safe-image"
import { Button } from "@/components/ui/button"
import { deleteMenuItem, setMenuItemStatus } from "@/lib/actions/admin"
import type { MenuItem } from "@/lib/menu-items"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground",
  approved: "bg-primary text-primary-foreground",
  rejected: "bg-destructive text-white",
  inactive: "bg-muted text-muted-foreground",
}

export function AdminMenuRow({ item }: { item: MenuItem }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  async function run(action: () => Promise<unknown>, message: string) {
    setIsSaving(true)
    try {
      await action()
      toast.success(message)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
      <SafeImage
        src={item.images[0]}
        alt={item.itemName}
        className="size-14 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.itemName}</p>
        <p className="truncate text-xs text-muted-foreground">
          {item.vendorBusinessName || item.vendorName || "PizzaHub vendor"} ·{" "}
          {item.category}
        </p>
      </div>

      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
          STATUS_STYLES[item.status] ?? STATUS_STYLES.pending
        )}
      >
        {item.status ?? "pending"}
      </span>

      <div className="flex flex-wrap gap-2">
        {(["approved", "rejected", "inactive"] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={item.status === status ? "default" : "outline"}
            disabled={isSaving}
            onClick={() =>
              run(
                () => setMenuItemStatus(item._id, status),
                `Item marked ${status}.`
              )
            }
          >
            {status}
          </Button>
        ))}
        <Button
          size="sm"
          variant="destructive"
          disabled={isSaving}
          onClick={() => run(() => deleteMenuItem(item._id), "Item deleted.")}
        >
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          Delete
        </Button>
      </div>
    </div>
  )
}
