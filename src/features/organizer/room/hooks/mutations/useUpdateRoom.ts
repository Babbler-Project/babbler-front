import { httpClient } from "@/lib/api/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsKeys } from "../queries/useRooms";

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; name: string; capacity: number }) =>
      httpClient.put(`/organizer/rooms/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
    },
    onError: (error) => {
      console.error("Error updating room:", error);
    },
  });
};
