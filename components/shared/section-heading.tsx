interface SectionHeadingProps {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
