"use server"

import { getServerToken } from "@/lib/auth-token"
import type { MenuItem, NewMenuItem, UpdateMenuItemInput } from "@/lib/menu-items"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// Every vendor mutation sends the JWT from the current session.
async function vendorFetch(path: string, method: "POST" | "PUT" | "DELETE", body?: object) {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const result = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(result?.error || result?.message || "Could not complete the request.")
  }
  return result
}

// Private reads live here (not in lib/api/menu.ts) because this file is
// server-only and can safely use next/headers to get the JWT.
export async function getMenuCount(query = ""): Promise<{ count: number }> {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}/add-menu/count?${query}`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Could not load the menu count (status ${res.status}).`)
  }
  return res.json()
}

export async function getMyMenuItems(): Promise<MenuItem[]> {
  const token = await getServerToken()
  const res = await fetch(`${BASE_URL}/my-menu-items`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Could not load your menu items (status ${res.status}).`)
  }
  return res.json()
}

export async function addMenu(data: NewMenuItem) {
  return vendorFetch("/add-menu", "POST", data)
}

export async function updateMenu(id: string, data: UpdateMenuItemInput) {
  return vendorFetch(`/update-menu-item/${id}`, "PUT", data)
}

export async function deleteMenu(id: string) {
  return vendorFetch(`/delete-menu-item/${id}`, "DELETE")
}
