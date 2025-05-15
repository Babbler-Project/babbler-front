import { Clock, FileText, Info, Target, Users } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { TalkSubmissionFormValues } from "../../schemas/talkSubmissionSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { levelColors } from "@/features/calendar/mapper";
import { useTalkTypes } from "../../talkTypes/hooks/queries/useGetTypes";
import { LEVEL_OPTIONS } from "./constants";

interface ReviewSectionProps {
  form: UseFormReturn<TalkSubmissionFormValues>;
  isSubmitting: boolean;
}

export function ReviewSection({ form, isSubmitting }: ReviewSectionProps) {
  const values = form.getValues();
  const { data: talkTypes } = useTalkTypes();

  // Get type and level labels for display
  const typeLabel =
    talkTypes?.find((type) => type.id === values.typeId)?.label || "Unknown";
  const levelLabel =
    LEVEL_OPTIONS.find((level) => level.id === values.levelId)?.label ||
    "Unknown";

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Review before submission</h3>
        <p className="text-muted-foreground text-sm">
          Please verify the details below
        </p>
      </div>

      {/* Main area - Talk information */}
      <div className="bg-accent/5 rounded-lg border border-border/50 overflow-hidden">
        {/* Title and badges */}
        <div className="border-b border-border/50 bg-background p-4">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-lg font-semibold">{values.title}</h2>
            <div className="flex gap-2 flex-shrink-0">
              <Badge
                variant="outline"
                className={levelColors[levelLabel as keyof typeof levelColors]}
              >
                {levelLabel}
              </Badge>
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" />
                {values.duration} min
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
            <FileText className="h-4 w-4" />
            Description
          </div>
          <div className="bg-background rounded-md p-3 text-sm leading-relaxed">
            {values.description}
          </div>
        </div>

        {/* Technical details */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <Info className="h-4 w-4" />
            Presentation Details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div className="bg-background p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1.5 font-medium">
                <Target className="h-3.5 w-3.5 text-primary" />
                Type
              </div>
              <div className="pl-5.5">{typeLabel}</div>
            </div>

            <div className="bg-background p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1.5 font-medium">
                <Users className="h-3.5 w-3.5 text-primary" />
                Audience
              </div>
              <div className="pl-5.5">{levelLabel}</div>
            </div>

            <div className="bg-background p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Duration
              </div>
              <div className="pl-5.5">{values.duration} minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission area */}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="sm:w-auto"
          size="lg"
        >
          {isSubmitting ? "Submitting..." : "Submit talk proposal"}
        </Button>
      </div>
    </div>
  );
}
