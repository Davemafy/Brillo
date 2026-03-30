export function formatDate(date: string) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const format: [string, Intl.DateTimeFormatOptions] = [
    "en-us",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ];

  const todayDate = today.toLocaleDateString(...format);
  const yesterdayDate = yesterday.toLocaleDateString(...format);

  return date === todayDate
    ? "Today"
    : date === yesterdayDate
      ? "Yesterday"
      : date;
}



