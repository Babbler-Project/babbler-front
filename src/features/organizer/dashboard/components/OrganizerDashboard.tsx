import { Card } from "@/components/ui/card";
import { CalendarView } from "@/features/calendar/components/CalendarView";
import mockTalks from "../data/mock-pending-talks.json";
import { useState } from "react";
import PlanificationModal from "./PlanificationModal";
import type { Room, Talk, TalkLevel, TalkStatus } from "@/types/domain/Talk";
import { TALK_STATUS } from "@/utils/talkStatus";
import PendingTalkList from "./PendingTalkList";

const OrganizerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  const [pendingTalks, setPendingTalks] = useState(
    mockTalks
      .filter((talk) => talk.status === TALK_STATUS.PENDING)
      .map((talk) => ({
        ...talk,
        level: talk.level as TalkLevel,
        room: talk.room ? (talk.room as Room) : null,
        status: talk.status as TalkStatus,
      })),
  );

  const handleOpenModal = (talk: Talk) => {
    setSelectedTalk(talk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTalk(null);
  };

  const handleScheduleTalk = () => {
    // Here you would typically update the talk status to SCHEDULED
    handleCloseModal();
  };

  const handleRejectTalk = (talkId: string) => {
    setPendingTalks((prevTalks) =>
      prevTalks
        .map((talk) =>
          talk.id === talkId
            ? {
                ...talk,
                status: TALK_STATUS.REJECTED,
              }
            : talk,
        )
        .filter((talk) => talk.status === TALK_STATUS.PENDING),
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-3 p-4 flex-1 h-[calc(100vh-7rem)]">
          <CalendarView className="h-full" />
        </Card>
        <Card className="col-span-1 p-4 flex flex-col gap-4 h-[calc(100vh-7rem)]">
          <PendingTalkList
            talks={pendingTalks}
            onAccept={handleOpenModal}
            onReject={handleRejectTalk}
            className="flex-1 flex flex-col max-h-full"
          />
        </Card>
      </div>

      <PlanificationModal
        talk={selectedTalk}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSchedule={handleScheduleTalk}
      />
    </div>
  );
};

export default OrganizerDashboard;
