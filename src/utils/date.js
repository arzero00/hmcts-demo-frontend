export const formatTaskDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  // Check if date is valid to prevent "Invalid Date" showing in UI
  if (isNaN(date.getTime())) return 'Invalid Date';

  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};