"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field"
import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { authClient } from "@/lib/auth-client"
import { getDashboardPath } from "@/lib/roles"
import type { Role } from "@/lib/roles"

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  // Keep this null when absent, so role-based redirect still has a chance.
  const redirectTo = searchParams.get("redirectTo")
  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Read the values typed into the form
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    setIsLoading(true)
    const { data, error } = await authClient.signIn.email({ email, password })
    setIsLoading(false)

    // Wrong email or password, or the server could not be reached
    if (error || !data) {
      toast.error(error?.message || "Invalid email or password.")
      return
    }

    // Blocked users must not use the platform
    if (data.user.isBlocked) {
      await authClient.signOut()
      toast.error("Your account has been blocked. Please contact support.")
      return
    }

    toast.success("Welcome back!")

    // Send each person to the dashboard that matches their role
    const role = (data.user.role as Role) || "customer"
    router.push(redirectTo || getDashboardPath(role))
    router.refresh()
  }

  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo || "/",
    })
  }

  return (
    <form onSubmit={handleSignIn}>
      <FieldGroup>
        <AuthFormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />

        <AuthFormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        <Field>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <FieldSeparator>Or</FieldSeparator>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            Sign in with Google
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-primary underline underline-offset-4 hover:opacity-70"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
