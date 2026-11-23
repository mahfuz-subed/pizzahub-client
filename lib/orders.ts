// Fields saved in the "orders" collection (see the requirement doc).
export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled"

export interface OrderPayload {
  itemId: string
  vendorId: string
  customerId: string
  // A few extra display fields so the order pages don't need extra lookups.
  customerName: string
  itemName: string
  itemImage: string | null
  vendorBusinessName: string | null
  // Required by the doc:
  deliveryDate: string
  deliveryAddress: string
  message: string
  status: "pending"
  createdAt: string
}

// An order as it comes back from the server.
export interface Order extends Omit<OrderPayload, "status"> {
  _id: string
  status: OrderStatus
}
