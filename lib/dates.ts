// Today as "2026-11-23" in the user's own time zone
export function getToday() {
  return new Date().toLocaleDateString("en-CA")
}

// "2026-12-05" -> "5 Dec 2026"
export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
