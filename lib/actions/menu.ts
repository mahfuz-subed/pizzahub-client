import type { NewMenuItem } from "@/lib/menu-items"

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
