import { NextResponse } from "next/server"

// Vercel limits request bodies to about 4.5 MB, so we stay under that.
const MAX_FILE_SIZE = 4 * 1024 * 1024

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

export async function POST(request: Request) {
  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    return errorResponse("Image upload is not configured.", 500)
  }

  // 1. Read the file the browser sent
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return errorResponse("Invalid upload request.", 400)
  }
  const file = formData.get("image")

  // 2. Check the file before sending it anywhere
  if (!(file instanceof File) || file.size === 0) {
    return errorResponse("Please choose an image file.", 400)
  }
  if (!file.type.startsWith("image/")) {
    return errorResponse("Only image files are allowed.", 400)
  }
  if (file.size > MAX_FILE_SIZE) {
    return errorResponse("Image must be smaller than 4 MB.", 400)
  }

  // 3. Forward the file to ImgBB
  try {
    const imgbbFormData = new FormData()
    imgbbFormData.append("image", file)

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: imgbbFormData }
    )
    const result = await response.json()

    if (!response.ok || !result.success) {
      return errorResponse("Image upload failed. Please try again.", 502)
    }

    // 4. Send back just the public URL
    return NextResponse.json({ url: result.data.url })
  } catch {
    return errorResponse("Could not reach the image service.", 502)
  }
}
