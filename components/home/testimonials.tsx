"use client"

import { Star } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FadeIn } from "@/components/shared/fade-in"

const testimonials = [
  {
    name: "Abdur Rahim.",
    detail: "Customer · Dhaka",
    quote:
      "Found a small pizza place I had never heard of before. The order was simple and the pizza arrived hot.",
  },
  {
    name: "Sadia K.",
    detail: "Customer · Sylhet",
    quote:
      "I like being able to see the menu and the area each shop is in before I order. Saved me a lot of guesswork.",
  },
  {
    name: "Tanvir H.",
    detail: "Customer · Austin",
    quote:
      "Ordering took a couple of minutes. The delivery date and address were all I had to fill in.",
  },
  {
    name: "Nadia R.",
    detail: "Customer · New York",
    quote:
      "The shop replied quickly and kept me updated on the order. Good pizza and no confusion.",
  },
  {
    name: "Imran S.",
    detail: "Customer · Dhaka",
    quote:
      "Being able to check my order status in one place is the main reason I keep coming back.",
  },
]

/** Two initials used as a simple avatar, e.g. "Rahim A." -> "RA". */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-secondary">
              <span className="size-2 rounded-full bg-secondary" />
              Customer testimonials
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Loved by pizza people
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A few words from people who ordered through PizzaHub.
            </p>
          </div>
        </FadeIn>

        {/* The padding leaves room for the previous / next buttons. */}
        <div className="mx-auto mt-10 w-full max-w-5xl px-2 sm:px-12">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem
                  key={item.name}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full flex-col rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                    <div
                      className="flex gap-0.5 text-secondary"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t pt-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {initials(item.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
