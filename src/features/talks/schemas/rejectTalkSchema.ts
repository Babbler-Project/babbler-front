import { z } from "zod";

export const rejectTalkSchema = z.object({
  message: z
    .string()
    .min(10, "Feedback must contain at least 10 characters")
    .max(500, "Feedback must not exceed 500 characters"),
});

export type RejectTalkFormValues = z.infer<typeof rejectTalkSchema>;
