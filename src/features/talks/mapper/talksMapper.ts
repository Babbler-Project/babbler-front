import type { TalkApiResponse } from "../types/api";
import type { Talk, TalkLevel, TalkStatus } from "@/types/domain/Talk";

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
    status: talk.status.label as TalkStatus,
    createdAt: new Date(talk.createdAt).toLocaleDateString(),
  };
}

export function mapApiTalksToDisplayTalks(talks: TalkApiResponse[]): Talk[] {
  return talks.map(mapApiTalkToDisplayTalk);
}
