export function MenuResultsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[26rem] animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  )
}
