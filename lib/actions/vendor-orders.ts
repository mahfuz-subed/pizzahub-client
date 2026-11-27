"use server"

import { getServerToken } from "@/lib/auth-token"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// Vendor-only action: accept or reject an order.
export async function updateOrderStatus(
  orderId: string,
  status: "accepted" | "rejected"
) {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}/update-order-status/${orderId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ status }),
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.error || "Could not update the order.")
  }
  return result
}
