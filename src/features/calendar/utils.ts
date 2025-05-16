import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  endOfDay,
  parseISO,
} from "date-fns";
import type { CalendarViewType, Talk, TimeSlot } from "./types";

export const LUNCH_BREAK_START_HOUR = 12;
export const LUNCH_BREAK_END_HOUR = 13;
export const LUNCH_BREAK_LABEL = "Lunch break";

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
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let i = 9; i < 19; i++) {
    slots.push({
      time: `${i}:00`,
      isBreakTime: i >= LUNCH_BREAK_START_HOUR && i < LUNCH_BREAK_END_HOUR,
    });
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
  cellHeight = 120,
  firstHour = 9,
  minEventHeight = 100,
): { top: number; height: number } => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const startHour = startDate.getUTCHours();
  const endHour = endDate.getUTCHours();
  const startMinutes = startDate.getUTCMinutes();
  const endMinutes = endDate.getUTCMinutes();

  const top =
    (startHour - firstHour) * cellHeight + (startMinutes / 60) * cellHeight;

  let height =
    (endHour - startHour) * cellHeight +
    ((endMinutes - startMinutes) / 60) * cellHeight;

  height = Math.max(height, minEventHeight);

  return { top, height };
};

/**
 * Format event time for display
 */
export function formatEventTime(isoString: string): string {
  const date = new Date(isoString);
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
}

/**
 * Format time range for display
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatEventTime(startTime)} - ${formatEventTime(endTime)}`;
}

/**
 * Format full date with time
 */
export function formatFullDateTime(dateString: string): string {
  const date = parseISO(dateString);
  return `${format(date, "dd/MM/yyyy, h:mm a")} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
}

/**
 * Get the start and end date for the current view
 */
export const getViewDateRange = (
  date: Date,
  viewType: CalendarViewType,
): { startDate: Date; endDate: Date } => {
  if (viewType === "day") {
    return {
      startDate: startOfDay(date),
      endDate: endOfDay(date),
    };
  } else {
    return {
      startDate: startOfWeek(date, { weekStartsOn: 1 }), // Monday
      endDate: endOfWeek(date, { weekStartsOn: 1 }), // Sunday
    };
  }
};

/**
 * Format time in UTC without timezone conversion
 * @param isoString ISO date string
 * @returns Time in HH:MM format in UTC timezone
 */
export const formatUtcTime = (isoString: string): string => {
  const date = new Date(isoString);
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
};

/**
 * Format date and time for display in UTC
 * @param isoString ISO date string
 * @returns Formatted date and time with UTC indication
 */
export const formatUtcDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hours}:${minutes} UTC`;
};
