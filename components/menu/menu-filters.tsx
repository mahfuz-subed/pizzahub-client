"use client"

import type { FormEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { FilterRadioGroup } from "@/components/menu/filter-radio-group"
import { Button } from "@/components/ui/button"
import { MENU_CATEGORIES } from "@/lib/menu-items"

// An empty value "" means "no filter"
const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  ...MENU_CATEGORIES.map((category) => ({ value: category, label: category })),
]

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
]

export function MenuFilters() {
  const router = useRouter()
  const pathname = usePathname() // "/menu"
  const searchParams = useSearchParams() // the filters currently in the address bar

  // Read what is currently chosen. "" means nothing is chosen.
  const currentSearch = searchParams.get("search") ?? ""
  const currentLocation = searchParams.get("location") ?? ""
  const currentCategory = searchParams.get("category") ?? ""
  const currentSort = searchParams.get("sort") ?? ""

  const hasActiveFilters = Boolean(
    currentSearch || currentLocation || currentCategory || currentSort
  )

  // Changes the filters in the address bar. A value of "" removes that filter.
  // Example: updateFilters({ category: "Meat Lovers" }) -> /menu?category=Meat%20Lovers
  function updateFilters(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, value] of Object.entries(changes)) {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false, // stay where we are instead of jumping to the top
    })
  }

  // Runs when the person presses Enter or clicks "Apply"
  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    updateFilters({
      search: (formData.get("search") as string).trim(),
      location: (formData.get("location") as string).trim(),
    })
  }

  return (
    <aside className="space-y-6 rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* key makes the boxes refill when the URL changes (for example after "Clear all") */}
      <form
        key={`${currentSearch}|${currentLocation}`}
        onSubmit={handleSearchSubmit}
        className="space-y-4"
      >
        <AuthFormField
          id="search"
          name="search"
          label="Search"
          placeholder="Pizza, ingredient, or area..."
          defaultValue={currentSearch}
        />

        <AuthFormField
          id="location"
          name="location"
          label="Location"
          placeholder="Area or city"
          defaultValue={currentLocation}
        />

        <Button type="submit" className="w-full">
          Apply
        </Button>
      </form>

      <FilterRadioGroup
        title="Category"
        name="category"
        options={CATEGORY_OPTIONS}
        selected={currentCategory}
        onChange={(value) => updateFilters({ category: value })}
      />

      <FilterRadioGroup
        title="Sort by"
        name="sort"
        options={SORT_OPTIONS}
        selected={currentSort}
        onChange={(value) => updateFilters({ sort: value })}
      />

      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.push(pathname, { scroll: false })}
        >
          Clear all filters
        </Button>
      )}
    </aside>
  )
}
