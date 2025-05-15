import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { talkTypeKeys } from "../queries/useGetTypes";
import type { TalkTypeForm } from "../../types";

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
