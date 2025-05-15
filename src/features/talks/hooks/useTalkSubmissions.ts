import { useGetSpeakerTalks } from "./queries/useGetSpeakerTalks";
import type { TalkSubmissionStatus } from "../types";

export function useSubmissions() {
  const {
    data: submissions = [],
    isLoading,
    error,
    refetch,
  } = useGetSpeakerTalks();

  const getSubmissionsByStatus = (status?: TalkSubmissionStatus) => {
    if (!status) return submissions;
    return submissions.filter((submission) => submission.status === status);
  };

  return {
    submissions,
    isLoading,
    error: error ? (error as Error).message : null,
    getSubmissionsByStatus,
    refetch,
  };
}
