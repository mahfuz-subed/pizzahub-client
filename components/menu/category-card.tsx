import Link from "next/link"

import { CATEGORY_ICONS } from "@/lib/category-icons"
import type { MenuCategory } from "@/lib/menu-items"

interface CategoryCardProps {
  category: MenuCategory
  itemCount?: number // leave it out to hide the count
}

export function CategoryCard({ category, itemCount }: CategoryCardProps) {
  const Icon = CATEGORY_ICONS[category] // a capital letter lets us use it as <Icon />

  return (
    <Link
      // encodeURIComponent keeps "Sides & Appetizers" safe inside a URL
      href={`/menu?category=${encodeURIComponent(category)}`}
      className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-5"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-secondary/20">
        <Icon className="size-5" />
      </span>

      <div>
        <h3 className="text-sm font-semibold leading-snug">{category}</h3>

        {itemCount !== undefined && (
          <p className="mt-1 text-xs text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        )}
      </div>
    </Link>
  )
}
