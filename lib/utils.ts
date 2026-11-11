export { cn } from "cn";

export const WEATHER_REFRESH = 5; // Minutes

/**
 * Converts a 12-hour time string (e.g., "2:30 PM", "11:15 AM") into total minutes from midnight.
 */
export function timeToMinutes(timeStr: string): number {
  // Regex splits the string into hours, minutes, and AM/PM (case-insensitive)
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    throw new Error(
      `Invalid time format: ${timeStr}. Expected format like '2:30 PM'.`,
    );
  }

  let [_, hoursStr, minutesStr, modifier] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Convert 12-hour behavior to 24-hour baseline minutes
  if (modifier.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}
