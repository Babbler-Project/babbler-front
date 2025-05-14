import { format } from "date-fns";
import type { PlanTalkRequest } from "../types";

export function createPlanningRequest(
  talkId: number,
  roomId: number,
  startDate: Date,
  endDate: Date,
): PlanTalkRequest {
  return {
    talkId,
    roomId,
    startDateTime: format(startDate, "yyyy-MM-dd HH:mm:ss"),
    endDateTime: format(endDate, "yyyy-MM-dd HH:mm:ss"),
  };
}
