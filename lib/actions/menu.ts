import type { NewMenuItem, UpdateMenuItemInput } from "@/lib/menu-items"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const addMenu = async (data: NewMenuItem) => {
  const res = await fetch(`${BASE_URL}/add-menu`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  // Turn server errors into a readable Error so the form can show a toast
  if (!res.ok) {
    throw new Error(
      result.error || result.message || "Could not add the menu item."
    )
  }
  return result
}

// Save changes made in the Edit dialog.
export const updateMenu = async (id: string, data: UpdateMenuItemInput) => {
  const res = await fetch(`${BASE_URL}/update-menu-item/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.error || result.message || "Could not update the item.")
  }
  return result
}

// Remove an item after the delete confirmation.
export const deleteMenu = async (id: string, vendorId: string) => {
  const res = await fetch(
    `${BASE_URL}/delete-menu-item/${id}?vendorId=${vendorId}`,
    { method: "DELETE" }
  )

  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.error || result.message || "Could not delete the item.")
  }
  return result
}
