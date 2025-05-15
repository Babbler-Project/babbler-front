import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient, ApiError } from "@/lib/api/http-client";
import { toast } from "sonner";
import { format } from "date-fns";
import { pendingTalksKeys } from "../queries/useGetPendingTalks";
import { planningKeys } from "@/features/calendar/hooks/queries/useGetPlannings";

interface PlanningApiResponse {
  id: number;
  startTime: string;
  endTime: string;
  countPlaces: number;
  isFull: boolean;
  talkId: number;
  roomId: number;
  createdAt: string;
  updatedAt: string;
}

export const usePlanTalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      talkId,
      roomId,
      startDate,
      endDate,
    }: {
      talkId: number;
      roomId: number;
      startDate: Date;
      endDate: Date;
    }) => {
      const requestData = {
        talkId,
        roomId,
        startDateTime: format(startDate, "yyyy-MM-dd HH:mm:ss"),
        endDateTime: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      };

      return await httpClient.post<PlanningApiResponse>(
        "/organizer/plannings",
        requestData,
      );
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: pendingTalksKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningKeys.all });

      const startTime = new Date(response.startTime).toLocaleTimeString();

      toast.success("Talk scheduled successfully", {
        description: `Talk scheduled for ${startTime}`,
      });
    },

    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        toast.error(error.error, {
          description: error.message,
        });
        return;
      }

      toast.error("Failed to schedule talk", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    },
  });
};
