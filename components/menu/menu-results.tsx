import { MenuItemCard } from "@/components/menu/menu-item-card"
import { StateMessage } from "@/components/shared/state-message"
import { getMenu } from "@/lib/api/menu"
import type { MenuItem } from "@/lib/menu-items"

export async function MenuResults({ query }: { query: string }) {
  let items: MenuItem[]

  // 1. Ask the server. If it fails, show an error message.
  try {
    items = await getMenu(query)
  } catch {
    return (
      <StateMessage
        title="We could not load the menu"
        description="Please try again in a moment."
      />
    )
  }

  // 2. Nothing matched, so show the empty state.
  if (items.length === 0) {
    return (
      <StateMessage
        title="No pizzas match your search"
        description="Try different words, or clear the filters."
        actionLabel="Clear filters"
        actionHref="/menu"
      />
    )
  }

  // 3. Show the cards.
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "item" : "items"} found
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}
