import type { TalkLevel, TalkSubmissionStatus } from "@/features/talks/types";

export interface PlanningApiResponse {
  id: number;
  startTime: string;
  endTime: string;
  countPlaces: number;
  isFull: boolean;
  talkId: number;
  roomId: number;
  createdAt: string;
  updatedAt: string;
  talk: {
    id: number;
    title: string;
    description: string;
    duration: number;
    messageFeedback: string | null;
    createdAt: string;
    updatedAt: string;
    status: {
      id: number;
      label: TalkSubmissionStatus;
    };
    level: {
      id: number;
      label: TalkLevel;
    };
    type: {
      id: number;
      label: string;
    };
    speaker: {
      id: number;
      email: string;
      roleId: number;
      createdAt: string;
      updatedAt: string;
    };
  };
  room: {
    id: number;
    name: string;
    capacity: number;
    createdAt: string;
    updatedAt: string;
  };
}

import type { Talk as BaseTalk } from "@/features/talks/types";

export type CalendarTalk = Omit<BaseTalk, "durationDisplay" | "createdAt">;

export interface PositionedTalk extends CalendarTalk {
  position: {
    top: number;
    height: number;
    left: string;
    width: string;
  };
}

export type Talk = CalendarTalk;

export interface TimeSlot {
  time: string;
  isBreakTime: boolean;
}

export type CalendarViewType = "day" | "week";
