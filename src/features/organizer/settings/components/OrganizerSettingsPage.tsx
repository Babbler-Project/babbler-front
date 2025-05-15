import {
  useCreateTalkType,
  useDeleteTalkType,
  useTalkTypes,
  useUpdateTalkType,
} from "@/features/talks/talkTypes/hooks/queries/useGetTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import ConfirmDeleteTypeDialog from "./AlertConfirmTypeDialog";
import { toast } from "sonner";
import TalkTypeForm from "./TalkTypeForm";

export default function OrganizerSettingsPage() {
  const { data: talkTypes, isLoading, error } = useTalkTypes();
  const createTalkType = useCreateTalkType();
  const deleteTalkType = useDeleteTalkType();
  const updateTalkType = useUpdateTalkType();
  const [newType, setNewType] = useState("");
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedType, setEditedType] = useState<string>("");

  const handleEditType = (type: { id: number; label: string }) => {
    setSelectedType(type.id);
    setEditedType(type.label);
    setIsEditing(true);
  };

  const handleSaveEdit = (id: number, label: string) => {
    if (label.trim() === "") return;
    updateTalkType.mutate(
      { id, label },
      {
        onSuccess: () => {
          toast.success("Talk type updated successfully!");
          setIsEditing(false);
          setEditedType("");
          setSelectedType(null);
        },
        onError: (error) => {
          toast.error("Error updating talk type: " + error.message);
          console.error("Error updating talk type:", error);
        },
      },
    );
  };

  const resetForm = () => {
    setNewType("");
    setSelectedType(null);
    setEditedType("");
    setIsEditing(false);
  };

  const handleAddTalkType = () => {
    if (newType.trim() === "") return;

    createTalkType.mutate(
      {
        label: newType,
      },
      {
        onSuccess: () => {
          toast.success("Talk type added successfully!");
          setNewType("");
        },
        onError: (error) => {
          toast.error("Error adding talk type: " + error.message);
          console.error("Error creating talk type:", error);
        },
      },
    );
  };

  const handleDeleteTalkType = () => {
    if (selectedType === null) return;

    deleteTalkType.mutate(selectedType, {
      onSuccess: () => {
        toast.success("Talk type deleted successfully!");
        setSelectedType(null);
      },
      onError: (error) => {
        toast.error("Error deleting talk type: " + error.message);
        console.error("Error deleting talk type:", error);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Organizer Settings</h1>
        <p className="text-muted-foreground">
          Configure talk types and other settings for your event.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Talk Types</CardTitle>
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
                <TalkTypeForm
                  initialValue={editedType}
                  isEditing={true}
                  isPending={updateTalkType.isPending}
                  onSubmit={(value) => {
                    handleSaveEdit(selectedType!, value);
                  }}
                  onCancel={resetForm}
                />
              ) : (
                <TalkTypeForm
                  isPending={createTalkType.isPending}
                  onSubmit={(value) => {
                    setNewType(value);
                    handleAddTalkType();
                  }}
                />
              )}
              <Card className="p-4 bg-primary-foreground">
                <div className="flex flex-wrap gap-2">
                  {talkTypes?.map((type) => (
                    <Badge
                      key={type.id}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => handleEditType(type)}
                      >
                        {type.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType(type.id);
                        }}
                      >
                        <ConfirmDeleteTypeDialog
                          handleDeleteTalkType={handleDeleteTalkType}
                        />
                      </button>
                    </Badge>
                  ))}
                </div>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
