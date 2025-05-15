import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { mapApiTalksToSubmissions } from "../../mapper/speakerTalksMapper";
import type { SpeakerTalkApiResponse, TalkSubmission } from "../../types";

export const speakerTalksKeys = {
  all: ["speakerTalks"] as const,
  lists: () => [...speakerTalksKeys.all, "list"] as const,
  details: (id: number) => [...speakerTalksKeys.all, "detail", id] as const,
};

export const useGetSpeakerTalks = () => {
  return useQuery<TalkSubmission[], Error>({
    queryKey: speakerTalksKeys.lists(),
    queryFn: async () => {
      const data =
        await httpClient.get<SpeakerTalkApiResponse[]>("/speaker/talks");
      return mapApiTalksToSubmissions(data);
    },
    staleTime: 0,
    refetchOnMount: "always",
  });
};
