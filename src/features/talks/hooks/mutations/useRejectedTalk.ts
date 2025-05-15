import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { toast } from "sonner";
import { pendingTalksKeys } from "../queries/useGetPendingTalks";
import { planningKeys } from "@/features/calendar/hooks/queries/useGetPlannings";

interface RejectTalkResponse {
  id: number;
  message: string;
  updatedAt: string;
}

export const useRejectTalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      talkId,
      message,
    }: {
      talkId: number;
      message: string;
    }) => {
      return await httpClient.put<RejectTalkResponse>(
        `/organizer/talks/${talkId}/refused`,
        { message },
      );
    },

    onSuccess: () => {
      // Invalidate the queries that need to be refreshed
      queryClient.invalidateQueries({ queryKey: pendingTalksKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningKeys.all });

      toast.success("Talk rejected", {
        description:
          "The talk has been rejected. Speaker will be notified with your feedback.",
      });
    },

    onError: (error) => {
      toast.error("Failed to reject talk", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    },
  });
};
