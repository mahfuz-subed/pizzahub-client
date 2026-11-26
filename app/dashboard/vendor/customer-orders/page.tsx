import { getVendorOrders } from "@/lib/api/orders"
import { getSession } from "@/lib/core/server"
import React from "react"

const CustomerOrdersPage = async () => {
  const session = await getSession()
  console.log("session", session)
  const userId = session?.user.id

  const result = await getVendorOrders(userId as string)
  console.log(result)
  return <div></div>
}

export default CustomerOrdersPage
