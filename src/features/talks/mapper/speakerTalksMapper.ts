import type {
  SpeakerTalkApiResponse,
  TalkSubmission,
  TalkSubmissionStatus,
} from "../types";
import { format, parseISO } from "date-fns";

/**
 * Format time in UTC without timezone conversion
 */
export const formatUtcTime = (isoString: string): string => {
  // Extract hours and minutes directly without timezone conversion
  const date = new Date(isoString);
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
};

export const mapApiTalkToSubmission = (
  talk: SpeakerTalkApiResponse,
): TalkSubmission => {
  const normalizedLevel =
    talk.level.label === "Beginer" ? "Beginner" : talk.level.label;

  const result: TalkSubmission = {
    id: talk.id.toString(),
    title: talk.title,
    description: talk.description,
    duration: talk.duration,
    level: normalizedLevel,
    category: talk.type.label,
    submittedAt: talk.createdAt,
    status: talk.status.label as TalkSubmissionStatus,
  };

  if (talk.status.label === "Refused" && talk.messageFeedback) {
    result.feedback = talk.messageFeedback;
  }

  if (talk.status.label === "Planed" && talk.planning) {
    const startDate = parseISO(talk.planning.startTime);

    result.schedule = {
      room: talk.planning.room.name,
      date: format(startDate, "MMMM d, yyyy"),
      startTime: formatUtcTime(talk.planning.startTime),
      endTime: formatUtcTime(talk.planning.endTime),
    };
  }

  return result;
};

export const mapApiTalksToSubmissions = (
  talks: SpeakerTalkApiResponse[],
): TalkSubmission[] => {
  return talks.map(mapApiTalkToSubmission);
};
