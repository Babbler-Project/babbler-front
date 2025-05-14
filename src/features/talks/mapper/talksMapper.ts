import type { TalkApiResponse } from "../types";
import type { Talk, TalkLevel, TalkSubmissionStatus } from "../types";

export function mapApiTalkToDisplayTalk(talk: TalkApiResponse): Talk {
  return {
    id: String(talk.id),
    title: talk.title,
    description: talk.description,
    duration: talk.duration,
    durationDisplay: `${talk.duration}min`,
    speaker: talk.speaker.email,
    level: talk.level.label as TalkLevel,
    type: talk.type.label,
    room: null,
    start: "",
    end: "",
    status: talk.status.label as TalkSubmissionStatus,
    createdAt: new Date(talk.createdAt).toLocaleDateString(),
  };
}

export function mapApiTalksToDisplayTalks(talks: TalkApiResponse[]): Talk[] {
  return talks.map(mapApiTalkToDisplayTalk);
}
