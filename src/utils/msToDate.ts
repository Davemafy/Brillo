export function msToDate(ms: string) {
  // Create a Date object from milliseconds
  const date = new Date(ms);

  // Check for invalid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date from milliseconds.");
  }

  // Format date in words
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
