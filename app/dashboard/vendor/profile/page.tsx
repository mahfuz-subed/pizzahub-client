import { redirect } from "next/navigation"

import { ProfileSettingsForm } from "@/components/dashboard/profile-settings-form"
import { getSession } from "@/lib/core/server"

export default async function VendorProfilePage() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Your account
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Profile Settings
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Keep your personal information up to date.
      </p>

      <div className="mt-6">
        <ProfileSettingsForm
          name={session.user.name}
          image={session.user.image}
          email={session.user.email}
        />
      </div>
    </div>
  )
}
