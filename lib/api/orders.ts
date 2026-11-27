import { getServerToken } from "@/lib/auth-token"
import type { Order } from "@/lib/orders"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// All orders placed by one customer.
export const getMyOrders = async (): Promise<Order[]> => {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}/my-orders`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Could not load your orders (status ${res.status}).`)
  }
  return res.json()
}

export const getVendorOrders = async (): Promise<Order[]> => {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}/vendor-orders`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Could not load orders (status ${res.status}).`)
  }
  return res.json()
}
