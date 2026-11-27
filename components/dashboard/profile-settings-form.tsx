"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

/** Reusable profile form for both vendor and customer dashboards. */
export function ProfileSettingsForm({
  name,
  image,
  email,
}: {
  name: string
  image: string | null | undefined
  email: string
}) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newName = (formData.get("name") as string).trim()
    const newImage = (formData.get("image") as string).trim()

    if (!newName) {
      toast.error("Please enter your name.")
      return
    }

    setIsSaving(true)
    try {
      // Only name and image are sent. Role and subscription have input:false
      // in lib/auth.ts, so they can never be changed from here.
      const result = await authClient.updateUser({
        name: newName,
        image: newImage || null,
      })

      if (result.error) {
        toast.error(result.error.message || "Could not save your profile.")
        return
      }

      toast.success("Profile updated.")
      router.refresh()
    } catch {
      toast.error("Could not save your profile.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-9">
      <div className="mb-7 flex items-center gap-4 border-b pb-6">
        <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 text-xl font-bold text-primary">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Profile" className="size-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase() || "U"
          )}
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{name || "Your profile"}</h2>
          <p className="truncate text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
            <Input
              id="profile-name"
              name="name"
              defaultValue={name}
              className="h-11"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="profile-image">Profile Image URL</FieldLabel>
            <Input
              id="profile-image"
              name="image"
              type="url"
              defaultValue={image ?? ""}
              placeholder="https://example.com/photo.jpg"
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Paste a direct image URL. Leave empty to remove the picture.
            </p>
          </Field>

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
