"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[selectedIndex]}
        alt={alt}
        className="aspect-[4/3] w-full rounded-xl border object-cover"
      />

      {/* Thumbnails only appear when there is more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={cn(
                "overflow-hidden rounded-lg border-2",
                index === selectedIndex
                  ? "border-primary"
                  : "border-transparent"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
