"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthFormField } from "@/components/auth-forms/auth-form-field"
import { authClient } from "@/lib/auth-client"
import { SIGN_UP_ROLES, getDashboardPath } from "@/lib/roles"
import type { SignUpRole } from "@/lib/roles"
import { getPasswordError } from "@/lib/validator"
import { uploadImage } from "@/lib/upload-img"
export function SignUpForm() {
  const router = useRouter()
  const [role, setRole] = useState<SignUpRole>("customer")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Read the values typed into the form
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const imageFile = formData.get("image") as File
    const password = formData.get("password") as string

    // Stop early if the password is not strong enough
    const passwordError = getPasswordError(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    setIsLoading(true)

    // Upload the profile image only if the person chose one
    let imageUrl: string | undefined
    if (imageFile.size > 0) {
      try {
        imageUrl = await uploadImage(imageFile)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Image upload failed."
        )
        setIsLoading(false)
        return
      }
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      image: imageUrl,
    })
    setIsLoading(false)

    if (error) {
      toast.error(
        error.message || "Unable to create your account. Please try again."
      )
      return
    }

    toast.success("Your account was created successfully.")
    router.push(getDashboardPath(role))
    router.refresh()
  }

  async function handleGoogleSignUp() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }

  return (
    <form onSubmit={handleSignUp}>
      <FieldGroup>
        <AuthFormField
          id="name"
          name="name"
          label="Full Name"
          placeholder="your name"
          required
        />

        <AuthFormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />

        <AuthFormField
          id="image"
          name="image"
          type="file"
          accept="image/*"
          label="Profile Image (optional)"
        />

        <Field>
          <FieldLabel htmlFor="role">I am a</FieldLabel>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as SignUpRole)}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SIGN_UP_ROLES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <AuthFormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          description="At least 6 characters, with one uppercase and one lowercase letter."
          required
        />

        <Field>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <FieldSeparator>Or</FieldSeparator>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            Sign up with Google
          </Button>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary underline underline-offset-4 hover:opacity-70"
            >
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
