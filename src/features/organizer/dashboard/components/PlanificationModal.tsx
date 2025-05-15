import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CalendarCheck } from "lucide-react";
import { addMinutes } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { usePlanTalk } from "@/features/talks/hooks/mutations/usePlanTalk";
import { useRooms } from "../../room/hooks/queries/useRooms";
import type { Talk } from "@/features/talks/types";
import { MAX_TIME, MIN_TIME } from "../../constants/time";
import { Skeleton } from "@/components/ui/skeleton";

interface PlanificationModalProps {
  talk: Talk | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlanificationModal = ({
  talk,
  isOpen,
  onClose,
}: PlanificationModalProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);

  const {
    data: rooms,
    isLoading: roomsLoading,
    error: roomsError,
  } = useRooms();

  const planTalkMutation = usePlanTalk();

  const onCloseModal = () => {
    resetForm();
    onClose();
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate && newDate < new Date()) {
      setDate(undefined);
      return;
    }
    setDate(newDate);
  };

  const handleStartTimeChange = (time: Date | undefined) => {
    setStartTime(time);
    if (time && talk) {
      setEndTime(addMinutes(time, talk.duration));
    } else {
      setEndTime(undefined);
    }
  };

  const handleSchedule = () => {
    if (talk && selectedRoomId && date && startTime && endTime) {
      // Create a complete date for the start
      const fullStartDate = new Date(date);
      fullStartDate.setHours(startTime.getHours(), startTime.getMinutes(), 0);

      // Create a complete date for the end
      const fullEndDate = new Date(date);
      fullEndDate.setHours(endTime.getHours(), endTime.getMinutes(), 0);

      // Call mutation with formatted data
      planTalkMutation.mutate(
        {
          talkId: parseInt(talk.id),
          roomId: parseInt(selectedRoomId),
          startDate: fullStartDate,
          endDate: fullEndDate,
        },
        {
          onSuccess: () => {
            onCloseModal();
          },
        },
      );
    }
  };

  const resetForm = () => {
    setSelectedRoomId("");
    setDate(undefined);
    setStartTime(undefined);
    setEndTime(undefined);
  };

  const isFormValid = selectedRoomId && date && startTime;
  const isPending = planTalkMutation.isPending;

  return (
    <Dialog
      open={isOpen && !!talk}
      onOpenChange={(open) => !open && onCloseModal()}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Talk</DialogTitle>
          <DialogDescription>
            Assign a time slot and room for this talk.
          </DialogDescription>
        </DialogHeader>

        {talk && (
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <h3 className="font-medium text-lg">{talk.title}</h3>
              <p className="text-sm text-muted-foreground">
                {talk.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 items-center text-sm">
              <span className="font-medium">Speaker:</span>
              <span>{talk.speaker}</span>
              <Badge variant="outline" className="ml-2">
                {talk.durationDisplay}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {talk.level}
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                {talk.type}
              </Badge>
            </div>

            <div className="grid gap-4 pb-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                {roomsLoading ? (
                  <Skeleton className="h-10 col-span-3" />
                ) : roomsError ? (
                  <div className="col-span-3 text-red-500">
                    Failed to load rooms
                  </div>
                ) : (
                  <Select
                    value={selectedRoomId}
                    onValueChange={setSelectedRoomId}
                  >
                    <SelectTrigger id="room" className="col-span-3">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms?.map((room) => (
                        <SelectItem key={room.id} value={room.id.toString()}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "col-span-3 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start time
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="startTime"
                    className="w-24"
                    type="time"
                    min={MIN_TIME}
                    max={MAX_TIME}
                    step={1800}
                    value={startTime ? format(startTime, "HH:mm") : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        const [hours, minutes] = e.target.value
                          .split(":")
                          .map(Number);
                        const newTime = new Date();
                        newTime.setHours(hours, minutes, 0);
                        handleStartTimeChange(newTime);
                      }
                    }}
                  />
                </div>
              </div>

              {endTime && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">
                    End time
                  </Label>
                  <div className="col-span-3 flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {format(endTime, "HH:mm")}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onCloseModal} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!isFormValid || isPending}
            className="gap-1"
          >
            {isPending ? (
              <>Processing...</>
            ) : (
              <>
                <CalendarCheck className="h-4 w-4" />
                Schedule Talk
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanificationModal;
