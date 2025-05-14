import { useState, useEffect } from "react";
import { MOCK_SUBMISSIONS } from "../data/mock-submissions";
import type { TalkSubmission, TalkSubmissionStatus } from "../types";

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<TalkSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Simulation d'appel API avec délai
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubmissions(MOCK_SUBMISSIONS);
        setIsLoading(false);
      } catch {
        setError("Failed to fetch submissions");
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const getSubmissionsByStatus = (status?: TalkSubmissionStatus) => {
    if (!status) return submissions;
    return submissions.filter((submission) => submission.status === status);
  };

  return {
    submissions,
    isLoading,
    error,
    getSubmissionsByStatus,
  };
}
