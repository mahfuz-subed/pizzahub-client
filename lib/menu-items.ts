// The six categories from the requirement doc
export const MENU_CATEGORIES = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
] as const

export type MenuCategory = (typeof MENU_CATEGORIES)[number]

export type MenuItemStatus = "pending" | "approved" | "rejected" | "inactive"

// What the vendor form sends to the server
export interface NewMenuItem {
  vendorId: string
  itemName: string
  category: MenuCategory
  description: string
  price: number
  location: string // area / city
  images: string[] // ImgBB URLs
}

// What the Edit dialog sends when updating an item.
// vendorId is included so the server can check ownership.
export interface UpdateMenuItemInput {
  vendorId: string
  // Only send the fields you want to change.
  itemName?: string
  category?: MenuCategory
  description?: string
  price?: number
  location?: string
  images?: string[]
  status?: MenuItemStatus
}

// A menu item as it is saved in the database
export interface MenuItem extends NewMenuItem {
  _id: string
  vendorId: string
  status: MenuItemStatus
  createdAt: string
}

// Basic info about the vendor who owns an item
export interface VendorInfo {
  name: string
  businessName: string | null
}

// A menu item together with its vendor's info (used on public pages)
export interface MenuItemWithVendor extends MenuItem {
  vendor: VendorInfo
}

// How many approved items one category has
export interface CategoryCount {
  _id: string // the category name ($group stores it under _id)
  count: number
}
