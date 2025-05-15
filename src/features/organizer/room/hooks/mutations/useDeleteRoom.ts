import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { roomsKeys } from "../queries/useRooms";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => httpClient.delete(`/organizer/rooms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting room:", error);
    },
  });
};
