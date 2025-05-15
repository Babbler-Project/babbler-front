import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { roomsKeys } from "../queries/useRooms";
import type { RoomFormProps } from "../../types";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRoom: RoomFormProps) =>
      httpClient.post<RoomFormProps>("/organizer/rooms", newRoom),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating room:", error);
    },
  });
};
