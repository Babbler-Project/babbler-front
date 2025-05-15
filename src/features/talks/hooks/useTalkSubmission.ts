import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  talkSubmissionSchema,
  type TalkSubmissionFormValues,
} from "../schemas/talkSubmissionSchema";
import { useSubmitTalk } from "./mutations/useSubmitTalk";
import { useNavigate } from "react-router-dom";

// @TODO: Replace with actual speaker ID from user context when auth is implemented
const CURRENT_SPEAKER_ID = 1;

export function useTalkSubmission() {
  const navigate = useNavigate();
  const form = useForm<TalkSubmissionFormValues>({
    resolver: zodResolver(talkSubmissionSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 60,
      levelId: 1, // Default to Beginner
      typeId: undefined, // No default, user must select
    },
  });

  const submitTalkMutation = useSubmitTalk();

  const onSubmit = async (values: TalkSubmissionFormValues) => {
    try {
      await submitTalkMutation.mutateAsync({
        ...values,
        speakerId: CURRENT_SPEAKER_ID,
      });
      toast.success("Talk submitted successfully", {
        description: "Your talk proposal has been submitted for review.",
        duration: 5000,
      });
      form.reset();
      navigate("/speaker/talks");
    } catch (error) {
      console.error("Error submitting talk:", error);
      toast.error("Failed to submit talk", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return {
    form,
    isSubmitting: submitTalkMutation.isPending,
    onSubmit,
    error: submitTalkMutation.error,
  };
}
