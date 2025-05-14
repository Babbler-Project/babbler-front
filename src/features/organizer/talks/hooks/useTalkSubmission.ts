import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  talkSubmissionSchema,
  type TalkSubmissionFormValues,
} from "../schemas/talkSubmissionSchema";

export function useTalkSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<TalkSubmissionFormValues>({
    resolver: zodResolver(talkSubmissionSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 60,
      level: "Beginner",
      category: "",
    },
  });

  const onSubmit = async (values: TalkSubmissionFormValues) => {
    try {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.info("Talk submitted:", values);

      form.reset();
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting talk:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    submitSuccess,
    onSubmit,
  };
}
