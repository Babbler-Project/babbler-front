import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CalendarView } from "@/features/calendar/components/CalendarView";
import PlanificationModal from "./PlanificationModal";
import PendingTalkList from "./PendingTalkList";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPendingTalks } from "@/features/talks/hooks/queries/useGetPendingTalks";
import type { Talk } from "@/features/talks/types";

const OrganizerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  const { data: pendingTalks, isLoading, error } = useGetPendingTalks();

  const handleOpenModal = (talk: Talk) => {
    setSelectedTalk(talk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTalk(null);
  };

  const handleRejectTalk = (talkId: string) => {
    console.log("Rejecting talk with ID:", talkId);
    // API call would go here
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-3 p-4 flex-1 h-[calc(100vh-7rem)]">
          <CalendarView className="h-full" />
        </Card>
        <Card className="col-span-1 p-4 flex flex-col gap-4 h-[calc(100vh-7rem)]">
          {isLoading ? (
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : error ? (
            <div className="flex-1 text-red-500 flex items-center justify-center">
              Failed to load pending talks
            </div>
          ) : (
            <PendingTalkList
              talks={pendingTalks || []}
              onAccept={handleOpenModal}
              onReject={handleRejectTalk}
              className="flex-1 flex flex-col max-h-full"
            />
          )}
        </Card>
      </div>

      <PlanificationModal
        talk={selectedTalk}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrganizerDashboard;
