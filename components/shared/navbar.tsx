"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react"

import Logo from "@/components/logo"
import { authClient } from "@/lib/auth-client"
import { DASHBOARD_MENU_ITEMS } from "@/lib/dashboard-menu"
import { getDashboardPath } from "@/lib/roles"
import type { Role } from "@/lib/roles"
import { cn } from "@/lib/utils"

/** Links shown to everyone, whether logged in or not. */
const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Browse Menu" },
]

/** The extra main-nav link each role gets after logging in. */
const roleLinks: Record<Role, { href: string; label: string }> = {
  customer: { href: "/dashboard/customer", label: "My Orders" },
  vendor: { href: "/dashboard/vendor", label: "My Shop" },
  admin: { href: "/dashboard/admin", label: "Admin Panel" },
}

/** Reuse the ShadCN button look on a Link (no asChild needed). */
const buttonLinkClasses =
  "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"

type NavLink = { href: string; label: string }

/** Shows the profile image, or the first letter of the name as a fallback. */
function UserAvatar({
  name,
  image,
}: {
  name: string
  image?: string | null
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        width={32}
        height={32}
        unoptimized
        className="size-8 rounded-full object-cover"
      />
    )
  }

  return (
    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
      {name.charAt(0).toUpperCase() || "U"}
    </span>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  // Better Auth types extra fields as string, so narrow them by hand.
  const role: Role =
    user?.role === "vendor" || user?.role === "admin" ? user.role : "customer"
  const dashboardPath = getDashboardPath(role)
  // Use the same URL as the sidebar. Admin has no profile page, so this is
  // undefined for admin and the link is not rendered.
  const settingsPath = DASHBOARD_MENU_ITEMS[role].find(
    (item) => item.name === "Profile Settings"
  )?.url
  const navLinks: NavLink[] = user
    ? [...publicLinks, roleLinks[role]]
    : publicLinks

  // Close the profile menu when clicking anywhere outside of it.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  const closeProfile = () => setIsProfileOpen(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenu()
          closeProfile()
          router.push("/sign-in")
          router.refresh()
        },
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive(link.href) ? "text-secondary" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side: profile menu or sign-in buttons */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={isProfileOpen}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-primary/5"
              >
                <UserAvatar name={user.name} image={user.image} />
                <span className="max-w-32 truncate">{user.name}</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>

              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-56 rounded-xl border bg-card p-1 text-card-foreground shadow-lg"
                >
                  <div className="border-b border-secondary/30 px-3 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href={dashboardPath}
                    role="menuitem"
                    onClick={closeProfile}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary/10"
                  >
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Link>
                  {settingsPath && (
                    <Link
                      href={settingsPath}
                      role="menuitem"
                      onClick={closeProfile}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary/10"
                    >
                      <Settings className="size-4" /> Profile Settings
                    </Link>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="size-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={cn(
                  "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  isActive("/sign-in") && "text-secondary"
                )}
              >
                Sign In
              </Link>
              <Link href="/sign-up" className={buttonLinkClasses}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  isActive(link.href) ? "text-secondary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                <div className="flex items-center gap-2 px-3 py-2">
                  <UserAvatar name={user.name} image={user.image} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href={dashboardPath}
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary/10"
                >
                  <LayoutDashboard className="size-4" /> Dashboard
                </Link>
                {settingsPath && (
                  <Link
                    href={settingsPath}
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/10"
                  >
                    <Settings className="size-4" /> Profile Settings
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="size-4" /> Log Out
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    isActive("/sign-in") && "text-secondary"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className={buttonLinkClasses}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
