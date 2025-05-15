import { z } from "zod";

export const talkTypeSchema = z.object({
  label: z
    .string()
    .min(1, "Talk type name is required")
    .max(50, "Talk type name must be less than 50 characters"),
});

export type TalkTypeFormValues = z.infer<typeof talkTypeSchema>;
