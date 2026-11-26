"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "@/lib/actions/orders"

interface OrderDecisionButtonsProps {
  orderId: string
  vendorId: string
}

export function OrderDecisionButtons({
  orderId,
  vendorId,
}: OrderDecisionButtonsProps) {
  const router = useRouter()
  // Remembers which button was clicked while we wait for the server
  const [loadingStatus, setLoadingStatus] = useState<
    "accepted" | "rejected" | null
  >(null)
  const isBusy = loadingStatus !== null

  async function handleDecision(status: "accepted" | "rejected") {
    setLoadingStatus(status)
    try {
      await updateOrderStatus(orderId, vendorId, status)
      toast.success(
        status === "accepted" ? "Order accepted." : "Order rejected."
      )
      router.refresh() // reloads the list, so the buttons disappear
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update the order."
      )
    } finally {
      setLoadingStatus(null)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleDecision("accepted")}
        disabled={isBusy}
      >
        {loadingStatus === "accepted" && <Loader2 className="animate-spin" />}
        Accept
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleDecision("rejected")}
        disabled={isBusy}
      >
        {loadingStatus === "rejected" && <Loader2 className="animate-spin" />}
        Reject
      </Button>
    </div>
  )
}
