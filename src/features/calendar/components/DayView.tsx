import { useMemo } from "react";
import { generateTimeSlots } from "../utils";
import { mapDayTalks } from "../mapper";
import { TalkItem } from "./TalkItem";
import { LunchBreakSlot } from "./LunchBreakSlot";
import { cn } from "@/lib/utils";
import type { Talk } from "../types";

interface DayViewProps {
  currentDate: Date;
  talks: Talk[];
}

export function DayView({ currentDate, talks }: DayViewProps) {
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Map talks for this day with positioning data
  const positionedTalks = useMemo(
    () => mapDayTalks(talks, currentDate),
    [talks, currentDate],
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex border-b sticky top-0 bg-background z-10">
        {/* Empty cell for time column */}
        <div className="w-16 shrink-0 border-r p-2 text-center font-medium text-xs text-muted-foreground">
          Time
        </div>

        {/* Day header */}
        <div className="flex-1 p-2 text-center font-medium">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
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

        {/* Day content */}
        <div className="flex-1 relative">
          {/* Time slots background */}
          {timeSlots.map((slot, idx) =>
            slot.isBreakTime ? (
              <LunchBreakSlot key={idx} />
            ) : (
              <div key={idx} className="border-b h-30"></div>
            ),
          )}

          {/* Talks */}
          <div className="absolute inset-0">
            {positionedTalks.map((talk) => (
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
      </div>
    </div>
  );
}
