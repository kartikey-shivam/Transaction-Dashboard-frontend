export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);


  const options: Intl.DateTimeFormatOptions = {
    // weekday: 'long',   // "Monday"
    year: 'numeric',   // "2024"
    month: 'long',     // "November"
    day: 'numeric',    // "21"
        
  };


  return date.toLocaleString('en-US', options);
}
export function formatTime(dateString: string | number | Date) {
  const date = new Date(dateString);


  const options: Intl.DateTimeFormatOptions = {
    
    hour: '2-digit',   // "12"
    minute: '2-digit', // "59"
    second: '2-digit', // "54"
    hour12: true       // 12-hour format (AM/PM)
  };


  return date.toLocaleString('en-US', options);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

