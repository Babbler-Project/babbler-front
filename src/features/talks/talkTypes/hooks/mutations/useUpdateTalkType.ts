import { httpClient } from "@/lib/api/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkTypeKeys } from "../queries/useGetTypes";

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
