export interface Talk {
  id: string;
  title: string;
  description: string;
  speaker: string;
  duration: number; // in minutes
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  room: string;
  start: string; // ISO date string
  end: string; // ISO date string
  status: "Pending" | "Accepted" | "Scheduled" | "Rejected";
}

export interface PositionedTalk extends Talk {
  position: {
    top: number;
    height: number;
    left: string;
    width: string;
  };
}

export type CalendarViewType = "day" | "week";
export type Room = "Room A" | "Room B" | "Room C" | "Room D" | "Room E";

export interface TimeSlot {
  time: string;
  isBreakTime?: boolean;
}
