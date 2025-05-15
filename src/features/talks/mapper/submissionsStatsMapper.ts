import type { TalkSubmission } from "../types";

export interface SubmissionStats {
  totalCount: number;
  acceptedCount: number;
  pendingCount: number;
  refusedCount: number;
  totalMinutes: number;
  acceptedPercentage: number;
}

export const mapSubmissionsToStats = (
  submissions: TalkSubmission[],
): SubmissionStats => {
  const totalCount = submissions.length;

  const acceptedCount = submissions.filter(
    (talk) => talk.status === "Planed",
  ).length;
  const pendingCount = submissions.filter(
    (talk) => talk.status === "Pending",
  ).length;
  const refusedCount = submissions.filter(
    (talk) => talk.status === "Refused",
  ).length;

  const totalMinutes = submissions.reduce(
    (acc, talk) => acc + talk.duration,
    0,
  );

  const acceptedPercentage =
    totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;

  return {
    totalCount,
    acceptedCount,
    pendingCount,
    refusedCount,
    totalMinutes,
    acceptedPercentage,
  };
};
