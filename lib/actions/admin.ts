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

export async function changeUserRole(id: string, role: "vendor" | "customer") {
  return adminAction(`/users/${id}/role`, "PATCH", { role })
}

export async function setUserBlocked(id: string, isBlocked: boolean) {
  return adminAction(`/users/${id}/block`, "PATCH", { isBlocked })
}

export async function setMenuItemStatus(
  id: string,
  status: "approved" | "rejected" | "inactive"
) {
  return adminAction(`/admin/menu-items/${id}/status`, "PATCH", { status })
}

export async function deleteMenuItem(id: string) {
  return adminAction(`/admin/menu-items/${id}`, "DELETE")
}
