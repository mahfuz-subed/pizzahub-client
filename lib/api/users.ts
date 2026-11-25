const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return response.json()
}
