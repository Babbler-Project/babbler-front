import { useState } from "react";
import { addDays, subDays, addWeeks, subWeeks } from "date-fns";
import type { CalendarViewType, Talk } from "../types";
import mockTalks from "../data/mock-talks.json";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<CalendarViewType>("week");
  const [talks, setTalks] = useState<Talk[]>(mockTalks as Talk[]);

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
    talks,
    setTalks,
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
