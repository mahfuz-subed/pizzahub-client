import { Beef, CupSoda, Leaf, Pizza, Salad, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { MenuCategory } from "@/lib/menu-items"

export const CATEGORY_ICONS: Record<MenuCategory, LucideIcon> = {
  "Classic Pizzas": Pizza,
  "Vegetarian Pizzas": Leaf,
  "Meat Lovers": Beef,
  "Specialty / Gourmet Pizzas": Sparkles,
  "Sides & Appetizers": Salad,
  "Beverages & Desserts": CupSoda,
}
