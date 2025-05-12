import { useMemo } from "react";
import { getWeekDays, formatDay, generateTimeSlots } from "../utils";
import { mapWeekTalks } from "../mapper";
import { TalkItem } from "./TalkItem";
import type { Talk } from "../types";

interface WeekViewProps {
  currentDate: Date;
  talks: Talk[];
}

export function WeekView({ currentDate, talks }: WeekViewProps) {
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
        {/* Time column header */}
        <div className="w-16 shrink-0 border-r p-2 text-center font-medium text-xs text-muted-foreground">
          Time
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 flex-1">
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
          {timeSlots.map((time, idx) => (
            <div
              key={idx}
              className="border-b h-30 p-1 text-xs text-right text-muted-foreground pr-2"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="grid grid-cols-7 flex-1">
          {weekDays.map((_, dayIdx) => {
            const dayTalks = mappedWeekTalks[dayIdx] || [];

            return (
              <div key={dayIdx} className="border-r relative w-full">
                {/* Time slots background */}
                {timeSlots.map((_, idx) => (
                  <div key={idx} className="border-b h-30"></div>
                ))}

                {/* Talks */}
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
                      <TalkItem
                        talk={talk}
                        hasTooltip={true}
                        className="h-full"
                      />
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
