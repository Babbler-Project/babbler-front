import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { talkTypeKeys } from "../queries/useGetTypes";

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
