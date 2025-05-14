import type { TalkSubmission, TalkSubmissionStatus } from "../types";
import { formatDistanceToNow } from "date-fns";
import type { SubmissionTableItem } from "../types";

export const statusColorMap: Record<TalkSubmissionStatus, string> = {
  pending:
    "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
  accepted:
    "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  rejected: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
};

export const mapSubmissionToTableItem = (
  submission: TalkSubmission,
): SubmissionTableItem => {
  const submittedDate = new Date(submission.submittedAt);

  const result: SubmissionTableItem = {
    id: submission.id,
    title: submission.title,
    category: submission.category,
    level: submission.level,
    duration: submission.duration,
    submittedAt: {
      raw: submission.submittedAt,
      formatted: submittedDate.toLocaleDateString(),
      timeAgo: formatDistanceToNow(submittedDate, { addSuffix: true }),
    },
    status: submission.status,
    statusColor: statusColorMap[submission.status],
  };

  if (submission.status === "rejected" && submission.feedback) {
    result.feedback = submission.feedback;
  }

  if (submission.status === "accepted" && submission.schedule) {
    result.schedule = {
      room: submission.schedule.room,
      date: new Date(submission.schedule.date).toLocaleDateString(),
      startTime: submission.schedule.startTime,
      endTime: submission.schedule.endTime,
    };
  }

  return result;
};

export const mapSubmissionsToTableItems = (
  submissions: TalkSubmission[],
): SubmissionTableItem[] => {
  return submissions.map(mapSubmissionToTableItem);
};
