import { Form } from "@/components/ui/form";
import { useTalkSubmission } from "@/features/organizer/talks/hooks/useTalkSubmission";
import { AccordionStepper } from "@/components/ui/accordion-stepper";
import { useAccordionStepper } from "@/hooks/useAccordionStepper";
import { SECTION_IDS, TALK_SUBMISSION_SECTIONS } from "./constants";
import type { TalkFormSectionId } from "./constants";
import type { TalkSubmissionSuccess } from "./TalkSubmissionSuccess";
import { BasicInfoSection } from "./BasicInfoSection";
import { TechnicalDetailsSection } from "./TechnicalDetailsSection";
import { ReviewSection } from "./ReviewSection";
import { cn } from "@/lib/utils";

export default function TalkSubmissionForm({
  className,
}: {
  className?: string;
}) {
  const { form, isSubmitting, submitSuccess, onSubmit } = useTalkSubmission();

  const stepper = useAccordionStepper({
    form,
    sections: TALK_SUBMISSION_SECTIONS,
    sectionIds: SECTION_IDS,
    initialSection: "info",
  });

  if (submitSuccess) {
    return <TalkSubmissionSuccess />;
  }

  const renderSectionContent = (sectionId: string) => {
    const typedSectionId = sectionId as TalkFormSectionId;
    switch (typedSectionId) {
      case "info":
        return <BasicInfoSection form={form} />;
      case "details":
        return <TechnicalDetailsSection form={form} />;
      case "review":
        return <ReviewSection form={form} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <AccordionStepper
          openSection={stepper.openSection}
          sections={stepper.sections}
          sectionIds={stepper.sectionIds}
          onSectionChange={stepper.setOpenSection}
          onNextSection={stepper.goToNextSection}
          renderSectionContent={renderSectionContent}
          showNextButton={true}
          validateBeforeChange={true}
          onSectionChangeRequest={stepper.validateSectionChange}
        />
      </form>
    </Form>
  );
}
