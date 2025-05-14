export type TalkSubmissionStatus = "pending" | "accepted" | "rejected";

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
