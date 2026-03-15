export function isoToDate(isoString) {
  // Pass the string "2026-03-14T23:49:29.247343+00:00" directly
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string.");
  }

  // Format in words
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}