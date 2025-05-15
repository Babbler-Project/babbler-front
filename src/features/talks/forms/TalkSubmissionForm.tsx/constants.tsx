import { CheckCircle2, MessageSquare, Briefcase } from "lucide-react";
import type { StepSection } from "@/hooks/useAccordionStepper";

export const LEVEL_OPTIONS = [
  { id: 1, label: "Beginner" },
  { id: 2, label: "Intermediate" },
  { id: 3, label: "Advanced" },
];

export const TALK_SUBMISSION_SECTIONS: Record<
  "info" | "details" | "review",
  StepSection
> = {
  info: {
    id: "info",
    title: "Main Information",
    icon: <MessageSquare className="h-5 w-5" />,
    fields: ["title", "description"],
  },
  details: {
    id: "details",
    title: "Technical Details",
    icon: <Briefcase className="h-5 w-5" />,
    fields: ["typeId", "levelId", "duration"],
  },
  review: {
    id: "review",
    title: "Review",
    icon: <CheckCircle2 className="h-4 w-4" />,
    fields: [],
  },
};

export const SECTION_IDS = ["info", "details", "review"] as const;
export type TalkFormSectionId = (typeof SECTION_IDS)[number];
