// Uploads one image file and returns its public URL.
// Throws an Error with a readable message if something goes wrong.
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch("/api/upload-img", {
    method: "POST",
    body: formData,
  })
  if (!response.ok) {
    // A failed request can return HTML (e.g. a 404 page), so parse defensively.
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || "Image upload failed.")
  }

  const data = await response.json()
  return data.url
}
