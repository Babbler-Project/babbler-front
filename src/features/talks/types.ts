export type TalkSubmissionStatus = "pending" | "accepted" | "rejected";

export type TalkLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Talk {
  id: string;
  title: string;
  description: string;
  speaker: string;
  duration: number; // in minutes
  durationDisplay: string; // formatted duration
  level: TalkLevel;
  type: string;
  room: string;
  start: string; // ISO date string
  end: string; // ISO date string
  status: TalkSubmissionStatus;
}

export interface TalkApiResponse {
  id: number;
  title: string;
  description: string;
  duration: number;
  messageFeedback: string | null;
  createdAt: string;
  updatedAt: string;
  status: {
    id: number;
    label: string;
  };
  level: {
    id: number;
    label: string;
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
}

export interface TalkSubmissionRequest {
  title: string;
  description: string;
  speakerId: number;
  duration: number;
  levelId: number;
  typeId: number;
}

export interface TalkSubmissionResponse {
  id: number;
  title: string;
  description: string;
  speakerId: number;
  duration: number;
  levelId: number;
  typeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionTableItem {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: number;
  submittedAt: {
    raw: string;
    formatted: string;
    timeAgo: string;
  };
  status: TalkSubmissionStatus;
  statusColor: string;
}
