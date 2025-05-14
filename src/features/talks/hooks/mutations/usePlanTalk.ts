import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { toast } from "sonner";
import { format } from "date-fns";
import { pendingTalksKeys } from "../queries/useGetPendingTalks";

// The actual API response structure
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
      // Format dates directly here - no need for a separate mapper
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
      // Invalidate the queries that need to be refreshed
      queryClient.invalidateQueries({ queryKey: pendingTalksKeys.lists() });

      const startTime = new Date(response.startTime).toLocaleTimeString();

      toast.success("Talk scheduled successfully", {
        description: `Talk scheduled for ${startTime}`,
      });
    },

    onError: (error) => {
      toast.error("Failed to schedule talk", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    },
  });
};
