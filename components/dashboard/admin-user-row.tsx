"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { changeUserRole, setUserBlocked } from "@/lib/actions/admin"
import type { AdminUser } from "@/lib/api/admin"
import type { Role } from "@/lib/roles"

export function AdminUserRow({ user }: { user: AdminUser }) {
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
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>

      <div className="flex items-center gap-2">
        {(["vendor", "customer"] as Role[]).map((role) => (
          <Button
            key={role}
            size="sm"
            variant={user.role === role ? "default" : "outline"}
            disabled={isSaving || user.role === "admin"}
            onClick={() =>
              run(
                () => changeUserRole(user._id, role as "vendor" | "customer"),
                "Role updated."
              )
            }
          >
            {role}
          </Button>
        ))}
      </div>

      <Button
        size="sm"
        variant={user.isBlocked ? "secondary" : "destructive"}
        disabled={isSaving}
        onClick={() =>
          run(
            () => setUserBlocked(user._id, !user.isBlocked),
            user.isBlocked ? "User unblocked." : "User blocked."
          )
        }
      >
        {isSaving && <Loader2 className="size-4 animate-spin" />}
        {user.isBlocked ? "Unblock" : "Block"}
      </Button>
    </div>
  )
}
