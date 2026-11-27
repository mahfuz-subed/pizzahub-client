import type { CategoryCount, MenuItem } from "@/lib/menu-items"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getMenu = async (query = ""): Promise<MenuItem[]> => {
  const res = await fetch(`${BASE_URL}/menu?${query}`)

  if (!res.ok) {
    throw new Error(`Could not load the menu (status ${res.status}).`)
  }
  return res.json()
}
export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  const res = await fetch(`${BASE_URL}/menuDetails/${id}`)

  if (res.status === 404) {
    return null
  }
  if (!res.ok) {
    throw new Error(`Could not load the menu item (status ${res.status}).`)
  }
  return res.json()
}

// Public items for the homepage and Browse Menu (server already filters to approved).
export const getPublicMenuItems = async (): Promise<MenuItem[]> => {
  const res = await fetch(`${BASE_URL}/menu`, {
    cache: "no-store", // always show the latest approvals / availability
  })

  if (!res.ok) {
    throw new Error(`Could not load menu items (status ${res.status}).`)
  }
  return res.json()
}

// Vendor ids with Premium - used to mark and prioritise their items.
export const getPremiumVendorIds = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/premium-vendors`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Could not load Premium vendors (status ${res.status}).`)
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
