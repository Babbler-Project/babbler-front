import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateRoom } from "../../room/hooks/mutations/useCreateRoom";
import { useUpdateRoom } from "../../room/hooks/mutations/useUpdateRoom";
import { useDeleteRoom } from "../../room/hooks/mutations/useDeleteRoom";
import { useRooms } from "../../room/hooks/queries/useRooms";
import ConfirmDeleteTypeDialog from "./components/AlertConfirmTypeDialog";
import { DoorOpen } from "lucide-react";
import RoomForm from "./components/RoomForm";
import type { Room } from "../../room/types";

export default function RoomSettings() {
  const { data: rooms, isLoading, error } = useRooms();
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();
  const deleteRoom = useDeleteRoom();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoom, setEditedRoom] = useState<Room | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleEditRoom = (room: Room) => {
    setEditedRoom(room);
    setIsEditing(true);
    setSelectedRoom(room.id);
  };

  const handleAddRoom = (name: string, capacity: number) => {
    createRoom.mutate(
      { name, capacity },
      {
        onSuccess: () => {
          toast.success("Room added successfully");
          resetForm();
          setFormKey((prev) => prev + 1);
        },
        onError: (error) => {
          toast.error("Error adding room: " + error.message);
          console.error("Error creating room:", error);
        },
      },
    );
  };

  const handleSaveEdit = (roomId: number, name: string, capacity: number) => {
    if (!editedRoom) return;

    updateRoom.mutate(
      { id: roomId, name, capacity },
      {
        onSuccess: () => {
          toast.success("Room updated successfully");
          resetForm();
          setFormKey((prev) => prev + 1);
        },
        onError: (error) => {
          toast.error("Error updating room: " + error.message);
          console.error("Error updating room:", error);
        },
      },
    );
  };

  const handleDeleteRoom = (roomId: number) => {
    deleteRoom.mutate(roomId, {
      onSuccess: () => {
        toast.success("Room deleted successfully");
        resetForm();
        setFormKey((prev) => prev + 1);
      },
      onError: (error) => {
        toast.error("Error deleting room: " + error.message);
        console.error("Error deleting room:", error);
      },
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedRoom(null);
    setEditedRoom(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DoorOpen className="h-4 w-4" />
          Rooms
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : error ? (
          <div className="text-red-500">
            Error loading talk types: {error.message}
          </div>
        ) : (
          <>
            {isEditing ? (
              <RoomForm
                initialValue={editedRoom}
                isEditing={true}
                isPending={updateRoom.isPending}
                onSubmit={(name, capacity) => {
                  if (selectedRoom) {
                    handleSaveEdit(selectedRoom, name, capacity);
                  }
                }}
                onCancel={resetForm}
              />
            ) : (
              <RoomForm
                key={formKey}
                isPending={createRoom.isPending}
                onSubmit={handleAddRoom}
              />
            )}
            <Card className="p-4 bg-primary-foreground">
              <div className="flex flex-wrap gap-2">
                {rooms?.map((room) => (
                  <Badge
                    key={room.id}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => handleEditRoom(room)}
                    >
                      {room.name} ({room.capacity})
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoom(room.id);
                      }}
                    >
                      <ConfirmDeleteTypeDialog
                        handleDeleteTalkType={() => handleDeleteRoom(room.id)}
                      />
                    </button>
                  </Badge>
                ))}
              </div>
            </Card>
            <span className="text-muted-foreground text-xs mt-2">
              *Name (capacity)
            </span>
          </>
        )}
      </CardContent>
    </Card>
  );
}
