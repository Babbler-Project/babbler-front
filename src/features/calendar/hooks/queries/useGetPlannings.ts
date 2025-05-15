import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { mapPlanningsToTalks } from "../../mapper";
import type { PlanningApiResponse } from "../../types";
import { format, addDays } from "date-fns";

export const planningKeys = {
  all: ["plannings"] as const,
  lists: () => [...planningKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...planningKeys.lists(), filters] as const,
};

export const formatDateForApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const useGetPlannings = (startDate: Date, endDate: Date) => {
  const adjustedEndDate = isSameDay(startDate, endDate)
    ? addDays(endDate, 1)
    : endDate;

  const formattedStartDate = formatDateForApi(startDate);
  const formattedEndDate = formatDateForApi(adjustedEndDate);

  return useQuery({
    queryKey: planningKeys.list({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    }),
    queryFn: async () => {
      try {
        const data = await httpClient.get<PlanningApiResponse[]>(
          `/plannings?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        );
        return mapPlanningsToTalks(data);
      } catch (error) {
        console.error("Error fetching plannings:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};

import { isSameDay } from "date-fns";
