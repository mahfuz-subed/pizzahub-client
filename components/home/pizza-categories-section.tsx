import { CategoryCard } from "@/components/menu/category-card"
import { FadeIn } from "@/components/shared/fade-in"
import { SectionHeading } from "@/components/shared/section-heading"
import { getCategoryCounts } from "@/lib/api/menu"
import { MENU_CATEGORIES } from "@/lib/menu-items"
import type { CategoryCount } from "@/lib/menu-items"

// Looks up how many items one category has.
// A category missing from the list has no approved items, so its count is 0.
function findCount(counts: CategoryCount[] | null, category: string) {
  if (!counts) return undefined // the request failed, so show no number

  const match = counts.find((row) => row._id === category)
  return match ? match.count : 0
}

export async function PizzaCategoriesSection() {
  let counts: CategoryCount[] | null = null

  try {
    counts = await getCategoryCounts()
  } catch {
    // If the counts fail to load, we still show the categories, just without numbers
  }

  return (
    <section className="bg-muted/40 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Pizza Categories"
          description="Pick a category and find your next favorite."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {MENU_CATEGORIES.map((category, index) => (
            <FadeIn key={category} delay={(index % 3) * 0.1} className="h-full">
              <CategoryCard
                category={category}
                itemCount={findCount(counts, category)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
