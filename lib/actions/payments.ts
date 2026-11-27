"use server"

import { getServerToken } from "@/lib/auth-token"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export async function checkoutVerify(sessionId: string) {
  const token = await getServerToken()
  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ sessionId }),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(result?.error || "Could not verify the payment.")
  }
  return result
}
