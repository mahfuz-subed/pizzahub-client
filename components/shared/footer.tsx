import Link from "next/link"
import { Mail, Phone } from "lucide-react"

import Logo from "@/components/logo"

/*
 * All footer content lives in these arrays.
 * To change a link or add a social profile, edit one line here.
 */

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Browse Menu" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
]

const contactItems = [
  { icon: Phone, text: "+880 1234 567 890" },
  { icon: Mail, text: "hello@pizzahub.com" },
]

const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    icon: XLogo,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramLogo,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookLogo,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: YoutubeLogo,
  },
]

/** Small wrapper so every column heading looks the same. */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-sm font-bold tracking-wide text-foreground">
      {children}
    </h2>
  )
}

/*
 * Lucide v1 no longer ships brand icons, so we draw the few we need here.
 * Each takes a className just like a Lucide icon, so they drop in anywhere.
 */
type SocialIconProps = { className?: string }

function XLogo({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.3 22H3.2l7.3-8.3L2.9 2h6.5l4.4 5.8L18.9 2Zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20Z" />
    </svg>
  )
}

function InstagramLogo({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function FacebookLogo({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H18V.3C17.5.2 16.6.1 15.5.1 13.2.1 11.7 1.5 11.7 4v2H8.5v3H11v12h3V9Z" />
    </svg>
  )
}

function YoutubeLogo({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top: four columns on desktop, stacked on small screens */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Hot, fresh pizza from the shops around you. Browse menus, order in
              a few clicks, and get it delivered to your door.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-2.5">
              {contactItems.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <item.icon className="mt-0.5 size-4 shrink-0 text-secondary" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <FooterHeading>Follow us</FooterHeading>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-secondary hover:text-primary"
                >
                  <link.icon className="size-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Got a pizza shop?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-primary hover:underline"
              >
                Partner with us
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PizzaHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
