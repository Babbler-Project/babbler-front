import type {
  SpeakerTalkApiResponse,
  TalkSubmission,
  TalkSubmissionStatus,
} from "../types";

export const mapApiTalkToSubmission = (
  talk: SpeakerTalkApiResponse,
): TalkSubmission => {
  const result: TalkSubmission = {
    id: talk.id.toString(),
    title: talk.title,
    description: talk.description,
    duration: talk.duration,
    level: talk.level.label,
    category: talk.type.label,
    submittedAt: talk.createdAt,
    status: talk.status.label as TalkSubmissionStatus,
  };

  if (talk.status.label === "Refused" && talk.messageFeedback) {
    result.feedback = talk.messageFeedback;
  }

  return result;
};

export const mapApiTalksToSubmissions = (
  talks: SpeakerTalkApiResponse[],
): TalkSubmission[] => {
  return talks.map(mapApiTalkToSubmission);
};
