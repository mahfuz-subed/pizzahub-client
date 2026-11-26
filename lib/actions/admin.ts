"use server"

import { getServerToken } from "@/lib/auth-token"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// Mutation helper - same Authorization header as the read API.
async function adminAction(path: string, method: "PATCH" | "DELETE", body?: object) {
  const token = await getServerToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.error || `Request failed (${res.status}).`)
  }
  return result
}

export const changeUserRole = (id: string, role: "vendor" | "customer") =>
  adminAction(`/users/${id}/role`, "PATCH", { role })

export const setUserBlocked = (id: string, isBlocked: boolean) =>
  adminAction(`/users/${id}/block`, "PATCH", { isBlocked })

export const setMenuItemStatus = (
  id: string,
  status: "approved" | "rejected" | "inactive"
) => adminAction(`/admin/menu-items/${id}/status`, "PATCH", { status })

export const deleteMenuItem = (id: string) =>
  adminAction(`/admin/menu-items/${id}`, "DELETE")
