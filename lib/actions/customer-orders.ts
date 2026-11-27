"use server"

import { getServerToken } from "@/lib/auth-token"
import type { OrderPayload } from "@/lib/orders"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

async function customerFetch(path: string, method: "POST" | "PUT", body: object) {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.error || "Could not complete the request.")
  }
  return result
}

// customerId is added by the server - it is never trusted from the form.
export async function orderMenu(data: OrderPayload) {
  return customerFetch("/orders", "POST", data)
}

export async function cancelOrder(id: string) {
  return customerFetch(`/cancel-order/${id}`, "PUT", {})
}
