import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarView } from "@/features/calendar/components/CalendarView";
import { Check, X } from "lucide-react";
import mockTalks from "../data/mock-pending-talks.json";
import { useState } from "react";
import PlanificationModal from "./PlanificationModal";
import type { Room, Talk, TalkLevel, TalkStatus } from "@/types/domain/Talk";
import { TALK_STATUS } from "@/utils/talkStatus";

const OrganizerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  const handleOpenModal = (talk: Talk) => {
    setSelectedTalk(talk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTalk(null);
  };

  const handleScheduleTalk = () => {
    handleCloseModal();
  };

  const [pendingTalks, setPendingTalks] = useState(
    mockTalks
      .filter((talk) => talk.status === TALK_STATUS.PENDING)
      .map((talk) => ({
        ...talk,
        level: talk.level as TalkLevel, // Ensure level is cast to TalkLevel
        room: talk.room ? (talk.room as Room) : null, // Ensure room is cast to Room or null
        status: talk.status as TalkStatus, // Ensure status is cast to TalkStatus
      })),
  );

  const handleValidate = (talkId: string, isApproved: boolean) => {
    setPendingTalks((prevTalks) =>
      prevTalks
        .map((talk) =>
          talk.id === talkId
            ? {
                ...talk,
                status: isApproved ? TALK_STATUS.PENDING : TALK_STATUS.REJECTED,
              }
            : talk,
        )
        .filter((talk) => talk.status === TALK_STATUS.PENDING),
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-3 p-4 flex-1">
          <CalendarView className="max-h-[calc(100vh-5rem)]" />
        </Card>
        <Card className="col-span-1 p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Talks to Validate</h2>
          <div className="flex flex-col gap-3 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
            {pendingTalks.length === 0 ? (
              <p className="text-gray-500">No talks pending validation</p>
            ) : (
              pendingTalks.map((talk) => (
                <Card
                  key={talk.id}
                  className="p-3 shadow-sm border-l-4 border-l-amber-400"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium line-clamp-1" title={talk.title}>
                      {talk.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600 line-clamp-2"
                      title={talk.description}
                    >
                      {talk.description}
                    </p>
                    <div className="text-xs text-gray-500 flex flex-col gap-1">
                      <div>
                        <span className="font-medium">Speaker:</span>{" "}
                        {talk.speaker}
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium">Duration:</span>{" "}
                        {talk.duration}min
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                          {talk.level}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                          {talk.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                        onClick={() => handleOpenModal(talk)}
                      >
                        <Check size={16} className="mr-1" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                        onClick={() => handleValidate(talk.id, false)}
                      >
                        <X size={16} className="mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
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
