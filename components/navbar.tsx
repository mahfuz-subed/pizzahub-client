"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import Logo from "@/components/logo"
import { cn } from "@/lib/utils"

/**
 * Links shown to everyone. When authentication is added, this is the
 * single place we can swap in role-specific links (vendor/customer/admin).
 */
const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Browse Menu" },
]

/** Reuse the ShadCN button look on a Link (no asChild needed). */
const buttonLinkClasses =
  "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsMenuOpen(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {publicLinks.map((link) => (
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

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 md:flex">
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
            {publicLinks.map((link) => (
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
              <Link href="/sign-up" onClick={closeMenu} className={buttonLinkClasses}>
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
