export type Role = "admin" | "vendor" | "customer"

// Roles a person can pick on the public sign-up form. Never include "admin".
export const SIGN_UP_ROLES = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
] as const

export type SignUpRole = (typeof SIGN_UP_ROLES)[number]["value"]

const DASHBOARD_PATHS: Record<Role, string> = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor",
  customer: "/dashboard/customer",
}

export function getDashboardPath(role: Role) {
  return DASHBOARD_PATHS[role]
}
