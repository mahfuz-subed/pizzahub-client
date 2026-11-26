import { StateMessage } from "@/components/shared/state-message"
import { getAdminTransactions, getAdminUsers } from "@/lib/api/admin"

export default async function TransactionsPage() {
  let transactions: Awaited<ReturnType<typeof getAdminTransactions>> = []
  let users: Awaited<ReturnType<typeof getAdminUsers>> = []
  let hasError = false

  try {
    // Two simple reads - the list pages can stay small and easy to follow.
    ;[transactions, users] = await Promise.all([
      getAdminTransactions(),
      getAdminUsers(),
    ])
  } catch {
    hasError = true
  }

  // A map makes it easy to show a name instead of a raw id.
  const vendors = new Map(users.map((user) => [user._id, user]))

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Payment records are read-only for admins.
      </p>

      <div className="mt-6">
        {hasError ? (
          <StateMessage
            title="We could not load transactions"
            description="Please try again in a moment."
          />
        ) : transactions.length === 0 ? (
          <StateMessage title="No transactions yet" />
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((item) => {
                  const vendor = vendors.get(item.userId)
                  return (
                    <tr key={item._id}>
                      <td className="px-4 py-3">
                        <p className="font-medium">
                          {vendor?.name ?? "Unknown vendor"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {vendor?.email ?? item.userId}
                        </p>
                      </td>
                      <td className="px-4 py-3 capitalize">Premium</td>
                      <td className="px-4 py-3">
                        {item.amount_total !== undefined
                          ? `${(item.amount_total / 100).toFixed(2)} ${(item.currency ?? "usd").toUpperCase()}`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {item.payment_status ?? item.status}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
