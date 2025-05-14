import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { mapApiTalksToDisplayTalks } from "@/features/talks/mapper/talksMapper";
import type { TalkApiResponse } from "../../types";
import type { Talk } from "../../types";

export const pendingTalksKeys = {
  all: ["pendingTalks"] as const,
  lists: () => [...pendingTalksKeys.all, "list"] as const,
};

export const useGetPendingTalks = () => {
  return useQuery<Talk[], Error>({
    queryKey: pendingTalksKeys.lists(),
    queryFn: async () => {
      const data = await httpClient.get<TalkApiResponse[]>("/organizer/talks");
      return mapApiTalksToDisplayTalks(data);
    },
  });
};
