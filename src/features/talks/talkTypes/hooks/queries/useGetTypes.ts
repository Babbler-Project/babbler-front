import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type { TalkType } from "../../types";

export const talkTypeKeys = {
  all: ["talk-types"] as const,
  lists: () => [...talkTypeKeys.all, "list"] as const,
  detail: (id: number) => [...talkTypeKeys.all, "detail", id] as const,
};

export const useTalkTypes = () => {
  return useQuery({
    queryKey: talkTypeKeys.lists(),
    queryFn: () => httpClient.get<TalkType[]>("/types"),
  });
};

export const useTalkTypeById = (id: number) => {
  return useQuery({
    queryKey: talkTypeKeys.detail(id),
    queryFn: () => httpClient.get<TalkType>(`/types/${id}`),
    enabled: !!id,
  });
};
