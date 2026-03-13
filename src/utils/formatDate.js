export function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const format = [
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



