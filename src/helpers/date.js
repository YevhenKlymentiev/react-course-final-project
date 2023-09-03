export function formatDateStr(dateStr) {
  const date = new Date(dateStr);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const days = `0${date.getDate()}`.slice(-2);
  const months = `0${date.getMonth() + 1}`.slice(-2);
  const years = date.getFullYear();

  return `${days}.${months}.${years} [${hours}:${minutes}]`;
}
