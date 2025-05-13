import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import type { Talk } from "../types";

// Format date to display in header
export const formatDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

// Get days for the current week view
export const getWeekDays = (currentDate: Date): Date[] => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday

  return eachDayOfInterval({ start, end });
};

// Format day for column headers
export const formatDay = (date: Date): string => {
  return format(date, "EEE d");
};

// Generate time slots for the calendar - Use smaller increments for finer granularity
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let i = 9; i < 19; i++) {
    slots.push(`${i}:00`);
  }
  return slots;
};

// Get talks for a specific day
export const getTalksForDay = (talks: Talk[], day: Date): Talk[] => {
  return talks.filter((talk) => {
    const talkDate = new Date(talk.start);
    return isSameDay(talkDate, day);
  });
};

// Calculate positioning styles based on event time
export const calculateEventPosition = (
  startTime: string,
  endTime: string,
  cellHeight = 120, // Augmenté de 80 à 120px pour des cellules plus hautes
  firstHour = 9,
  minEventHeight = 100, // Hauteur minimale augmentée également
): { top: number; height: number } => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startHour = startDate.getHours();
  const endHour = endDate.getHours();
  const startMinutes = startDate.getMinutes();
  const endMinutes = endDate.getMinutes();

  // Calculate position (assuming firstHour is the first slot)
  const top =
    (startHour - firstHour) * cellHeight + (startMinutes / 60) * cellHeight;

  // Calculate raw height
  let height =
    (endHour - startHour) * cellHeight +
    ((endMinutes - startMinutes) / 60) * cellHeight;

  // Apply minimum height if necessary
  height = Math.max(height, minEventHeight);

  return { top, height };
};

/**
 * Format event time for display
 */
export function formatEventTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format time range for display
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatEventTime(startTime)} - ${formatEventTime(endTime)}`;
}
