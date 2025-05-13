import { useCalendar } from "../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";
import { cn } from "@/lib/utils";

export function CalendarView({ className }: { className?: string }) {
  const { currentDate, viewType, setViewType, talks, navigation } =
    useCalendar();

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="sticky top-0 z-20 bg-background border-b">
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onViewChange={setViewType}
          onNavigate={navigation.navigate}
          onToday={navigation.goToToday}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {viewType === "week" ? (
          <WeekView currentDate={currentDate} talks={talks} />
        ) : (
          <DayView currentDate={currentDate} talks={talks} />
        )}
      </div>
    </div>
  );
}
