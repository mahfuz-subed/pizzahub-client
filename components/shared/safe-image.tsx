"use client"

import { useState } from "react"
import { ImageOff } from "lucide-react"

/**
 * An img that shows a neutral placeholder if the URL is missing or broken.
 * Used for menu items and order images that come from ImgBB / Unsplash.
 */
export function SafeImage({
  src,
  alt,
  className,
}: {
  src: string | null | undefined
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className ?? ""}`}
      >
        <ImageOff className="size-6" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  )
}
