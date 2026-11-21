// Returns an error message, or null if the password is valid.
export function getPasswordError(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long."
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include a lowercase letter."
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include an uppercase letter."
  }
  return null
}
