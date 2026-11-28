import { getServerToken } from "@/lib/auth-token"
import type { MenuItem } from "@/lib/menu-items"
import type { Role } from "@/lib/roles"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// Small helper so every admin request sends the same Authorization header.
async function adminFetch(path: string, init?: RequestInit) {
  const token = await getServerToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...init?.headers,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Admin request failed (${res.status}).`)
  }
  return res.json()
}

export interface AdminOverview {
  users: number
  vendors: number
  customers: number
  menuItems: number
  pending: number
  transactions: number
}

export interface AdminUser {
  _id: string
  name: string
  email: string
  role: Role
  isBlocked: boolean
}

export interface AdminTransaction {
  _id: string
  vendorId: string
  plan: string
  amount: number | null
  currency: string | null
  stripeSessionId: string | null
  stripeSubscriptionId: string | null
  status: string
  createdAt: string
}

export const getAdminOverview = () =>
  adminFetch("/admin/overview") as Promise<AdminOverview>

export const getAdminUsers = (query = "") =>
  adminFetch(`/users${query ? `?${query}` : ""}`) as Promise<AdminUser[]>

export const getAdminMenuItems = (query = "") =>
  adminFetch(`/admin/menu-items${query ? `?${query}` : ""}`) as Promise<
    MenuItem[]
  >

export const getAdminTransactions = () =>
  adminFetch("/admin/transactions") as Promise<AdminTransaction[]>
