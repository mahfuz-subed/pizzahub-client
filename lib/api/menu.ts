import type { MenuItem } from "@/lib/menu-items"
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
