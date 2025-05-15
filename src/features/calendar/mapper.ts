import type { PlanningApiResponse, Talk, PositionedTalk } from "./types";
import { calculateEventPosition, getTalksForDay } from "./utils";

export const mapPlanningsToTalks = (
  plannings: PlanningApiResponse[],
): Talk[] => {
  return plannings
    .map((planning) => {
      try {
        if (!planning.talk || !planning.room) {
          console.warn("Planning missing required data:", planning);
          return null;
        }

        return {
          id: planning.id.toString(),
          title: planning.talk.title || "Untitled Talk",
          description: planning.talk.description || "",
          speaker: planning.talk.speaker?.email || "Unknown Speaker",
          duration: planning.talk.duration || 0,
          level: planning.talk.level?.label || "Beginner",
          type: planning.talk.type?.label || "General",
          room: planning.room.name || "TBD",
          start: planning.startTime,
          end: planning.endTime,
          status: planning.talk.status?.label || "Planed",
        };
      } catch (error) {
        console.error("Error mapping planning:", error, planning);
        return null;
      }
    })
    .filter(Boolean) as Talk[];
};

/**
 * Determines if two events overlap in time
 */
const doEventsOverlap = (event1: Talk, event2: Talk): boolean => {
  const start1 = new Date(event1.start).getTime();
  const end1 = new Date(event1.end).getTime();
  const start2 = new Date(event2.start).getTime();
  const end2 = new Date(event2.end).getTime();

  return start1 < end2 && start2 < end1;
};

/**
 * Groups overlapping events together
 */
const groupOverlappingEvents = (events: Talk[]): Talk[][] => {
  if (events.length <= 1) return [events];

  // Sort events by start time
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  const groups: Talk[][] = [];
  let currentGroup: Talk[] = [sortedEvents[0]];

  for (let i = 1; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i];
    // Check if current event overlaps with any event in the current group
    const hasOverlap = currentGroup.some((groupEvent) =>
      doEventsOverlap(currentEvent, groupEvent),
    );

    if (hasOverlap) {
      currentGroup.push(currentEvent);
    } else {
      // No overlap, start a new group
      groups.push(currentGroup);
      currentGroup = [currentEvent];
    }
  }

  // Add the last group
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
};

/**
 * Maps a list of talks to include their position data for rendering
 * with handling for overlapping events
 */
export const mapTalksWithPosition = (
  talks: Talk[],
  cellHeight = 80,
  firstHour = 9,
): PositionedTalk[] => {
  // Group overlapping events across all rooms
  const overlappingGroups = groupOverlappingEvents(talks);
  const positionedTalks: PositionedTalk[] = [];

  // Process each group of overlapping events
  overlappingGroups.forEach((group) => {
    // For single events, no need to adjust width
    if (group.length === 1) {
      const talk = group[0];
      const { top, height } = calculateEventPosition(
        talk.start,
        talk.end,
        cellHeight,
        firstHour,
      );

      positionedTalks.push({
        ...talk,
        position: { top, height, left: "2.5%", width: "95%" },
      });
    }
    // For multiple overlapping events, adjust width and offset
    else {
      const columnCount = group.length;
      const columnWidth = 95 / columnCount; // percentage width

      group.forEach((talk, index) => {
        const { top, height } = calculateEventPosition(
          talk.start,
          talk.end,
          cellHeight,
          firstHour,
        );

        const left = 2.5 + columnWidth * index;

        positionedTalks.push({
          ...talk,
          position: {
            top,
            height,
            left: `${left}%`,
            width: `${columnWidth - 1}%`, // -1 for gap
          },
        });
      });
    }
  });

  return positionedTalks;
};

/**
 * Maps talks for a specific day and adds positioning data with overlap handling
 */
export const mapDayTalks = (
  talks: Talk[],
  day: Date,
  cellHeight = 120,
  firstHour = 9,
): PositionedTalk[] => {
  const dayTalks = getTalksForDay(talks, day);
  return mapTalksWithPosition(dayTalks, cellHeight, firstHour);
};

/**
 * Maps talks for each day of the week with overlap handling
 */
export const mapWeekTalks = (
  talks: Talk[],
  days: Date[],
  cellHeight = 120,
  firstHour = 9,
): Record<number, PositionedTalk[]> => {
  return days.reduce(
    (acc, day, index) => {
      acc[index] = mapDayTalks(talks, day, cellHeight, firstHour);
      return acc;
    },
    {} as Record<number, PositionedTalk[]>,
  );
};

/**
 * Colors based on difficulty level
 */
export const levelColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Advanced:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

/**
 * Border colors based on difficulty level
 */
export const levelBorderColors = {
  Beginner: "border-l-4 border-green-500",
  Intermediate: "border-l-4 border-blue-500",
  Advanced: "border-l-4 border-purple-500",
};
