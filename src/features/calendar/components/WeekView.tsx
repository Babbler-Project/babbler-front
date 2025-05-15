import { useMemo } from "react";
import { getWeekDays, formatDay, generateTimeSlots } from "../utils";
import { mapWeekTalks } from "../mapper";
import { TalkItem } from "./TalkItem";
import { LunchBreakSlot } from "./LunchBreakSlot";
import { cn } from "@/lib/utils";
import type { Talk } from "../types";

interface WeekViewProps {
  currentDate: Date;
  talks: Talk[];
  isLoading?: boolean;
  error?: { message: string; retry: () => void };
}
export function WeekView({ currentDate, talks, error }: WeekViewProps) {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Map talks for each day with positioning data
  const mappedWeekTalks = useMemo(
    () => mapWeekTalks(talks, weekDays),
    [talks, weekDays],
  );

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="flex border-b sticky top-0 bg-background z-10">
        <div className="w-16 shrink-0 border-r p-2 text-center font-medium text-xs text-muted-foreground">
          Time
        </div>

        <div className="grid grid-cols-7 flex-1 w-[calc(100%-4rem)]">
          {weekDays.map((day, idx) => (
            <div key={idx} className="border-r p-2 text-center font-medium">
              {formatDay(day)}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-1 overflow-auto">
        {/* Time slots */}
        <div className="border-r w-16 shrink-0">
          {timeSlots.map((slot, idx) => (
            <div
              key={idx}
              className={cn(
                "border-b h-30 p-1 text-xs text-right pr-2",
                !slot.isBreakTime && "text-muted-foreground",
              )}
            >
              {slot.time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="grid grid-cols-7 flex-1 relative">
          {error && (
            <div className="absolute inset-0 flex items-start justify-center bg-background/80 z-10 pt-12">
              <div className="text-red-500 p-4 bg-red-50 rounded border border-red-200">
                {error.message}
                <button
                  className="ml-4 px-2 py-1 bg-red-100 rounded"
                  onClick={error.retry}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {weekDays.map((_, dayIdx) => {
            const dayTalks = mappedWeekTalks[dayIdx] || [];
            const isFirstColumn = dayIdx === 0;

            return (
              <div key={dayIdx} className="border-r relative w-full">
                {/* Time slots background */}
                {timeSlots.map((slot, idx) =>
                  slot.isBreakTime ? (
                    <LunchBreakSlot key={idx} showLabel={isFirstColumn} />
                  ) : (
                    <div key={idx} className="border-b h-30"></div>
                  ),
                )}

                <div className="absolute inset-0">
                  {dayTalks.map((talk) => (
                    <div
                      key={talk.id}
                      className="absolute"
                      style={{
                        top: `${talk.position.top}px`,
                        height: `${talk.position.height}px`,
                        left: talk.position.left,
                        width: talk.position.width,
                      }}
                    >
                      <TalkItem talk={talk} className="h-full" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
