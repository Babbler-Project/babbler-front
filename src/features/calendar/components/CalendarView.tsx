import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { cn } from "@/lib/utils";
import { useCalendar } from "../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { useGetPlannings } from "../hooks/queries/useGetPlannings";

export function CalendarView({ className }: { className?: string }) {
  const calendar = useCalendar();

  const { currentDate, viewType, setViewType, dateRange, navigation } =
    calendar;

  const {
    data: planningTalks,
    error,
    refetch,
  } = useGetPlannings(dateRange.startDate, dateRange.endDate);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="sticky top-0 z-20 bg-background pb-2">
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onViewChange={setViewType}
          onNavigate={navigation.navigate}
          onToday={navigation.goToToday}
        />
      </div>

      <div className="flex-1 overflow-y-auto border rounded-md bg-background relative">
        {viewType === "day" ? (
          <DayView
            currentDate={currentDate}
            talks={planningTalks || []}
            error={
              error
                ? {
                    message: "Failed to load schedule data",
                    retry: () => refetch(),
                  }
                : undefined
            }
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            talks={planningTalks || []}
            error={
              error
                ? {
                    message: "Failed to load schedule data",
                    retry: () => refetch(),
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
