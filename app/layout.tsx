import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Sans-serif used for the PizzaHub logo and future section headings.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        jakarta.variable
      )}
    >
      <body className="min-h-svh">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
