"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { orderMenu } from "@/lib/actions/customer-orders"
import { useSession } from "@/lib/auth-client"
import type { MenuItem } from "@/lib/menu-items"
import type { Role } from "@/lib/roles"

interface OrderPanelProps {
  item: MenuItem
  role: Role
  userId: string
}

export function OrderPanel({ item, role, userId }: OrderPanelProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Prefer the live session, but fall back to the values the server passed in.
  const activeRole = (session?.user?.role ?? role) as Role
  const activeUserId = session?.user?.id ?? userId

  function canOrder() {
    if (item.status !== "approved") {
      toast.error("This item is not available right now.")
      return false
    }
    if (activeRole === "admin") {
      toast.error("Admins cannot place customer orders.")
      return false
    }
    if (activeRole === "vendor") {
      toast.error("Vendor accounts cannot place orders.")
      return false
    }
    if (activeRole !== "customer") {
      toast.error("Only customer accounts can place orders.")
      return false
    }
    if (item.vendorId === activeUserId) {
      toast.error("You cannot order your own item.")
      return false
    }
    return true
  }

  // Today in YYYY-MM-DD, used as both the default and the earliest allowed date.
  // Built from local date parts so it isn't shifted by UTC.
  function getToday() {
    const d = new Date()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${d.getFullYear()}-${month}-${day}`
  }
  const today = getToday()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const deliveryDate = formData.get("deliveryDate") as string

    if (!deliveryDate || deliveryDate < today) {
      toast.error("Please choose today or a future delivery date.")
      return
    }

    const orderData = {
      itemId: item._id,
      vendorId: item.vendorId,
      customerId: activeUserId,
      customerName: session?.user?.name ?? "Customer",
      itemName: item.itemName,
      itemImage: item.images[0] ?? null,
      vendorBusinessName: item.vendorBusinessName ?? null,
      deliveryDate,
      deliveryAddress: (formData.get("deliveryAddress") as string).trim(),
      message: (formData.get("message") as string).trim(),
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    setIsSaving(true)
    try {
      const result = await orderMenu(orderData)
      if (result.insertedId) {
        toast.success("Order placed successfully.")
        router.push("/dashboard/customer/orders")
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not place your order."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      {!isFormOpen ? (
        <Button
          onClick={() => {
            if (canOrder()) setIsFormOpen(true)
          }}
          size="lg"
          className="w-full"
        >
          Order Now
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm font-semibold">Order {item.itemName}</p>

          <AuthFormField
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            label="Delivery Date"
            defaultValue={today}
            min={today}
            required
          />

          <AuthFormField
            id="deliveryAddress"
            name="deliveryAddress"
            label="Delivery Address"
            placeholder="House, street, area, city"
            required
          />

          <Field>
            <FieldLabel htmlFor="message">
              Additional Message (optional)
            </FieldLabel>
            <Textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Any special instructions for the shop..."
            />
          </Field>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsFormOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving ? "Placing..." : "Place Order"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
