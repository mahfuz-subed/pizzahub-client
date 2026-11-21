import { BrandLogo } from "@/components/shared/brand-logo"
import { SignInForm } from "@/components/auth-forms/sign-in-form"

export default function SignInPage() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-background px-4 py-12 text-foreground sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <BrandLogo />

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in to order your favorite pizza or manage your shop.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-9">
          <SignInForm />
        </div>
      </div>
    </section>
  )
}
