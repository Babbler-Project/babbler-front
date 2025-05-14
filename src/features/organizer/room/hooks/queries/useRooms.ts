import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type { Room, RoomApiResponse } from "../../types";

export const roomsKeys = {
  all: ["rooms"] as const,
  lists: () => [...roomsKeys.all, "list"] as const,
  details: (id: number) => [...roomsKeys.all, "details", id] as const,
};

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: roomsKeys.lists(),
    queryFn: () => httpClient.get<RoomApiResponse[]>("/organizer/rooms"),
  });
};
