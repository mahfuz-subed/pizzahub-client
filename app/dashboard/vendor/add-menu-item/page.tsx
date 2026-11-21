import { AddMenuItemForm } from "@/components/dashboard/add-menu-item-form"

export default function AddMenuItemPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Add Menu Item</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        New items are reviewed by an admin before they appear on the menu.
      </p>

      <div className="mt-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <AddMenuItemForm />
      </div>
    </div>
  )
}
