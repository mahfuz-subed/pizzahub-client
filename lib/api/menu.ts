import type {
  CategoryCount,
  MenuItem,
  MenuItemWithVendor,
} from "@/lib/menu-items"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getMyMenuItems = async (vendorId: string): Promise<MenuItem[]> => {
  const res = await fetch(
    `${BASE_URL}/my-menu-items?vendorId=${vendorId}` // always fetch fresh data, so new items show up
  )

  if (!res.ok) {
    throw new Error(`Could not load your menu items (status ${res.status}).`)
  }
  return res.json()
}

// Public items for the homepage and Browse Menu (server already filters to approved).
export const getPublicMenuItems = async (): Promise<MenuItemWithVendor[]> => {
  const res = await fetch(`${BASE_URL}/menu`, {
    cache: "no-store", // always show the latest approvals / availability
  })

  if (!res.ok) {
    throw new Error(`Could not load menu items (status ${res.status}).`)
  }
  return res.json()
}

export const getCategoryCounts = async (): Promise<CategoryCount[]> => {
  const res = await fetch(`${BASE_URL}/menu/categories`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Could not load categories (status ${res.status}).`)
  }
  return res.json()
}
