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
  itemName: string
  category: MenuCategory
  description: string
  price: number
  location: string // area / city
  images: string[] // ImgBB URLs
}

// A menu item as it is saved in the database
export interface MenuItem extends NewMenuItem {
  _id: string
  vendorId: string
  status: MenuItemStatus
  createdAt: string
}
