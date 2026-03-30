export function isoToDate(isoString: string) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string.");
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}