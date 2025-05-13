import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { StepSection } from "@/hooks/useAccordionStepper";
import { cn } from "@/lib/utils";

interface AccordionStepperProps<TId extends string> {
  openSection: TId;
  sections: Record<string, StepSection<TId>>;
  sectionIds: readonly TId[];
  onSectionChange: (value: TId) => void;
  onNextSection: (current: TId) => void;
  renderSectionContent: (sectionId: TId) => ReactNode;
  className?: string;
  showNextButton?: boolean;
  validateBeforeChange?: boolean;
  onSectionChangeRequest?: (
    currentSection: TId,
    targetSection: TId,
  ) => Promise<boolean>;
}

export function AccordionStepper<
  TFieldValues extends FieldValues,
  TId extends string,
>({
  openSection,
  sections,
  sectionIds,
  onSectionChange,
  onNextSection,
  renderSectionContent,
  className,
  showNextButton = true,
  validateBeforeChange = false,
  onSectionChangeRequest,
}: AccordionStepperProps<TFieldValues, TId>) {
  const handleValueChange = async (value: string) => {
    if (!value || value === openSection) return;

    const targetSection = value as TId;

    if (validateBeforeChange && onSectionChangeRequest) {
      const canChange = await onSectionChangeRequest(
        openSection,
        targetSection,
      );
      if (canChange) {
        onSectionChange(targetSection);
      }
    } else {
      onSectionChange(targetSection);
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={openSection}
      onValueChange={handleValueChange}
      className={cn("w-full", className)}
    >
      {sectionIds.map((sectionId) => {
        const section = sections[sectionId];
        const isCurrentSection = sectionId === openSection;
        const sectionIndex = sectionIds.indexOf(sectionId);
        const isCompletedSection =
          sectionIds.indexOf(openSection) > sectionIndex;

        return (
          <AccordionItem key={sectionId} value={sectionId} className="border-b">
            <AccordionTrigger
              className={cn("py-4", isCompletedSection && "text-primary")}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isCurrentSection || isCompletedSection
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {section.icon}
                </div>
                <span className="font-semibold">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-4 px-2">
              <div className="space-y-6">
                {renderSectionContent(sectionId)}

                {showNextButton &&
                  sectionId !== sectionIds[sectionIds.length - 1] && (
                    <div className="flex justify-end pt-2">
                      <Button
                        type="button"
                        onClick={() => onNextSection(sectionId)}
                        className="flex items-center gap-1"
                      >
                        Continue
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
