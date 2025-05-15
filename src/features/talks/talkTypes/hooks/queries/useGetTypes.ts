import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type { TalkType, TalkTypeForm } from "../../types";

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

export const useCreateTalkType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newType: TalkTypeForm) =>
      httpClient.post<TalkTypeForm>("/organizer/types", newType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: talkTypeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating talk type:", error);
    },
  });
};

export const useDeleteTalkType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => httpClient.delete(`/organizer/types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: talkTypeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting talk type:", error);
    },
  });
};

export const useUpdateTalkType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; label: string }) =>
      httpClient.put(`/organizer/types/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: talkTypeKeys.lists() });
    },
    onError: (error) => {
      console.error("Error updating talk type:", error);
    },
  });
};
