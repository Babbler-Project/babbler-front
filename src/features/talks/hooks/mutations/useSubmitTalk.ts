import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type {
  TalkSubmissionRequest,
  TalkSubmissionResponse,
} from "../../types";
import { queryClient } from "@/lib/query/query-client";
import { speakerTalksKeys } from "../queries/useGetSpeakerTalks";

export const useSubmitTalk = () => {
  return useMutation({
    mutationFn: (talkData: TalkSubmissionRequest) =>
      httpClient.post<TalkSubmissionResponse>("/speaker/talks", talkData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: speakerTalksKeys.lists() });
    },
  });
};
