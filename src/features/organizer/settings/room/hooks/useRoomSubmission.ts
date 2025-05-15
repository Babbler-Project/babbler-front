import { z } from "zod";

export const roomFormSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  capacity: z
    .number()
    .min(1, "Capacity must be at least 1")
    .max(1000, "Capacity cannot exceed 1000"),
});

export type RoomFormSchema = z.infer<typeof roomFormSchema>;
