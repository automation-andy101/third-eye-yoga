export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTimeEnd(dateString, durationMinutes) {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + durationMinutes);
  return formatTime(date);
}
