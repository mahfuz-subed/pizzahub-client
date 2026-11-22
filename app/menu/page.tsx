import { Suspense } from "react"

import { MenuFilters } from "@/components/menu/menu-filters"
import { MenuResults } from "@/components/menu/menu-results"
import { MenuResultsSkeleton } from "@/components/menu/menu-result-skeleton"
import { SectionHeading } from "@/components/shared/section-heading"

const MenuPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Browse Menu"
          description="Search and filter pizzas from local pizza shops."
        />

        <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          <MenuFilters />

          {/* While the items load, the skeleton shows. key={query} makes it show again on every filter change. */}
          <Suspense key={query} fallback={<MenuResultsSkeleton />}>
            <MenuResults query={query} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default MenuPage
