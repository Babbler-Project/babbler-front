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
  room: string | null; // room name or null if not assigned
  start: string; // ISO date string
  end: string; // ISO date string
  status: TalkSubmissionStatus;
  createdAt: string;
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

export interface PlanTalkRequest {
  startDateTime: string; // format "2025-05-14 09:00:00"
  endDateTime: string; // format "2025-05-14 09:30:00"
  roomId: number;
  talkId: number;
}

export interface PlanTalkResponse {
  id: number;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
  room: {
    id: number;
    // name: string;
  };
  talk: {
    id: number;
    // title: string;
  };
}

export interface TalkSubmission {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  category: string;
  submittedAt: string;
  status: TalkSubmissionStatus;
  schedule?: {
    room: string;
    date: string;
    startTime: string;
    endTime: string;
  };
  feedback?: string;
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
  feedback?: string;
  schedule?: {
    room: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}
