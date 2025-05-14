import { z } from "zod";

export const talkSubmissionSchema = z.object({
  title: z
    .string()
    .min(5, "Title must contain at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(20, "Description must contain at least 20 characters")
    .max(500, "Description must not exceed 500 characters"),
  duration: z
    .number()
    .int()
    .min(15, "Minimum duration is 15 minutes")
    .max(180, "Maximum duration is 3 hours (180 minutes)"),
  levelId: z.number({
    required_error: "Please select a level",
  }),
  typeId: z.number({
    required_error: "Please select a type",
  }),
});

export type TalkSubmissionFormValues = z.infer<typeof talkSubmissionSchema>;
