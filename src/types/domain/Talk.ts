import type { TalkStatus } from "@/utils/talkStatus";

export interface Talk {
  id: string;
  title: string;
  description: string;
  speaker: string;
  duration: number; // in minutes
  level: TalkLevel;
  category: string;
  room: Room | null; // Room can be null if not assigned
  start: string; // ISO date string
  end: string; // ISO date string
  status: TalkStatus;
}

export type TalkStatus = (typeof TalkStatus)[keyof typeof TalkStatus];

export type TalkLevel = "Beginner" | "Intermediate" | "Advanced";

export type Room = "Room A" | "Room B" | "Room C" | "Room D" | "Room E";
