import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  endOfDay,
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
