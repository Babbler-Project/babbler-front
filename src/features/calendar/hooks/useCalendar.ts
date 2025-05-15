import { useState, useMemo } from "react";
import { addDays, subDays, addWeeks, subWeeks } from "date-fns";
import { getViewDateRange } from "../utils";
import type { CalendarViewType } from "../types";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<CalendarViewType>("week");

  // Calculate current date range based on view type
  const dateRange = useMemo(
    () => getViewDateRange(currentDate, viewType),
    [currentDate, viewType],
  );

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  const goToNextDay = () => setCurrentDate(addDays(currentDate, 1));
  const goToPrevDay = () => setCurrentDate(subDays(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToPrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const navigationMap = {
    day: {
      prev: goToPrevDay,
      next: goToNextDay,
    },
    week: {
      prev: goToPrevWeek,
      next: goToNextWeek,
    },
  };

  const navigate = (direction: "prev" | "next") => {
    navigationMap[viewType][direction]();
  };

  return {
    currentDate,
    setCurrentDate,
    viewType,
    setViewType,
    dateRange,
    navigation: {
      goToToday,
      goToNextDay,
      goToPrevDay,
      goToNextWeek,
      goToPrevWeek,
      navigate,
    },
  };
}
