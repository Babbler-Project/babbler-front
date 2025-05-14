import type { TalkSubmissionFormValues } from "./schemas/talkSubmissionSchema";

export type TalkSubmissionStatus = "pending" | "accepted" | "rejected";

export interface TalkSubmission extends TalkSubmissionFormValues {
  id: string;
  submittedAt: string; // ISO date string
  status: TalkSubmissionStatus;
  updatedAt?: string;
  reviewedAt?: string;
  feedback?: string;
  eventId?: string;
  eventName?: string;
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
