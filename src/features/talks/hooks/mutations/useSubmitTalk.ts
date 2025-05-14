import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type {
  TalkSubmissionRequest,
  TalkSubmissionResponse,
} from "../../types/api";

export const useSubmitTalk = () => {
  return useMutation({
    mutationFn: (talkData: TalkSubmissionRequest) =>
      httpClient.post<TalkSubmissionResponse>("/speaker/talks", talkData),
  });
};
