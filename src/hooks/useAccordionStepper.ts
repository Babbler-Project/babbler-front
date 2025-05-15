import { useState } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

export type StepSection<TId extends string = string> = {
  id: TId;
  title: string;
  icon: React.ReactNode;
  fields: string[];
};

export type StepSections<TId extends string = string> = {
  [key in TId]: StepSection<TId>;
};

interface UseAccordionStepperProps<
  TFieldValues extends FieldValues,
  TId extends string,
> {
  form: UseFormReturn<TFieldValues>;
  sections: StepSections<TId>;
  sectionIds: readonly TId[];
  initialSection?: TId;
}

export function useAccordionStepper<
  TFieldValues extends FieldValues,
  TId extends string,
>({
  form,
  sections,
  sectionIds,
  initialSection,
}: UseAccordionStepperProps<TFieldValues, TId>) {
  const [openSection, setOpenSection] = useState<TId>(
    initialSection || sectionIds[0],
  );

  const goToNextSection = async (current: TId) => {
    const currentIdx = sectionIds.indexOf(current);
    if (currentIdx < 0 || currentIdx >= sectionIds.length - 1) return;

    const fieldsToValidate = sections[current].fields;
    const isValid = await form.trigger(
      fieldsToValidate as FieldPath<TFieldValues>[],
    );

    if (isValid) {
      const nextSection = sectionIds[currentIdx + 1];
      setOpenSection(nextSection);
    }
  };

  const validateSectionChange = async (
    currentSection: TId,
    targetSection: TId,
  ): Promise<boolean> => {
    const currentIdx = sectionIds.indexOf(currentSection);
    const targetIdx = sectionIds.indexOf(targetSection);

    if (targetIdx > currentIdx) {
      const fieldsToValidate = sections[currentSection].fields;
      return await form.trigger(fieldsToValidate as FieldPath<TFieldValues>[]);
    }

    return true;
  };

  return {
    openSection,
    setOpenSection,
    goToNextSection,
    validateSectionChange,
    sections,
    sectionIds,
  };
}
