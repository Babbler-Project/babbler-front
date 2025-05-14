import { CheckCircle2, MessageSquare, Briefcase } from "lucide-react";
import type { StepSection } from "@/hooks/useAccordionStepper";

export const CATEGORIES = [
  "Frontend",
  "Backend",
  "DevOps",
  "Mobile",
  "UX/UI",
  "Data Science",
  "Machine Learning",
  "Security",
  "Architecture",
  "Languages",
  "Other",
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
    fields: ["category", "level", "duration"],
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

export const EXPERIENCE_LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];
