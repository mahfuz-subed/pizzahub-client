import { Bike, Clock, Heart, Store } from "lucide-react"

import { FadeIn } from "@/components/shared/fade-in"

/*
 * All the content for this section lives in this one array.
 * To add, remove, or edit a benefit, change one entry here.
 */
const benefits = [
  {
    icon: Clock,
    title: "Made fresh, always",
    description:
      "Your pizza is made to order by the shop, not sitting under a heat lamp.",
  },
  {
    icon: Store,
    title: "Local shops, real flavor",
    description:
      "Find the small pizzerias in your area and try something beyond the chain.",
  },
  {
    icon: Bike,
    title: "At your door, fast",
    description:
      "Pick your favorites, set a delivery date, and leave the rest to us.",
  },
  {
    icon: Heart,
    title: "Good food does good",
    description:
      "Every order supports a local business and the people who run it.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-b border-border bg-muted/20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-secondary">
              <span className="size-2 rounded-full bg-secondary" />
              The PizzaHub difference
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Why Choose PizzaHub?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Good pizza should be easy to find and easy to get. Here is what
              makes us different.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={(index % 4) * 0.08}>
              <div className="h-full rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-lg bg-secondary/15 text-primary">
                  <benefit.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
