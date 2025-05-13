import type { Talk } from "@/types/domain/Talk";

export interface PositionedTalk extends Talk {
  position: {
    top: number;
    height: number;
    left: string;
    width: string;
  };
}

export type CalendarViewType = "day" | "week";

export interface TimeSlot {
  time: string;
  isBreakTime?: boolean;
}
