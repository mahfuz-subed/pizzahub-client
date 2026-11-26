import { OrderPayload } from "../orders"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const orderMenu = async (data: OrderPayload) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    // A server error may return HTML, so parse defensively.
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || "Could not place your order.")
  }

  return response.json()
}

// Cancel an order that is still pending.
export const cancelOrder = async (id: string, customerId: string) => {
  const response = await fetch(`${BASE_URL}/cancel-order/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ customerId }),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(result?.error || "Could not cancel your order.")
  }
  return result
}

//order status update

export const updateOrderStatus = async (
  orderId: string,
  vendorId: string,
  status: "accepted" | "rejected"
) => {
  const res = await fetch(`${BASE_URL}/update-order-status/${orderId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ vendorId, status }),
  })

  const result = await res.json()

  return result
}
