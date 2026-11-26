"use client"

import type { FormEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { Button } from "@/components/ui/button"

/**
 * A small reusable search bar for the admin list pages.
 * It writes the filters into the URL, and the server page reads them.
 */
export function AdminFilters({
  placeholder,
  extra,
}: {
  placeholder: string
  extra?: { name: string; label: string; options: { value: string; label: string }[] }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    const search = (formData.get("search") as string).trim()
    if (search) params.set("search", search)

    if (extra) {
      const value = formData.get(extra.name) as string
      if (value) params.set(extra.name, value)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <form
      key={searchParams.toString()}
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4"
    >
      <div className="min-w-56 flex-1">
        <AuthFormField name="search" label="Search" placeholder={placeholder} defaultValue={searchParams.get("search") ?? ""} />
      </div>

      {extra && (
        <div className="w-44">
          <label htmlFor={extra.name} className="mb-1 block text-sm font-medium">
            {extra.label}
          </label>
          <select
            id={extra.name}
            name={extra.name}
            defaultValue={searchParams.get(extra.name) ?? ""}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
          >
            <option value="">All</option>
            {extra.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button type="submit">Apply</Button>
    </form>
  )
}
