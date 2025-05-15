import { useTalkTypes } from "@/features/talks/talkTypes/hooks/queries/useGetTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateTalkType } from "@/features/talks/talkTypes/hooks/mutations/useCreateTalkType";
import { useDeleteTalkType } from "@/features/talks/talkTypes/hooks/mutations/useDeleteTalkType";
import { useUpdateTalkType } from "@/features/talks/talkTypes/hooks/mutations/useUpdateTalkType";
import TalkTypeForm from "./components/TalkTypeForm";
import ConfirmDeleteTypeDialog from "./components/AlertConfirmTypeDialog";
import { Tag } from "lucide-react";

export default function TalkTypeSettings() {
  const { data: talkTypes, isLoading, error } = useTalkTypes();
  const createTalkType = useCreateTalkType();
  const deleteTalkType = useDeleteTalkType();
  const updateTalkType = useUpdateTalkType();
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedType, setEditedType] = useState<string>("");
  const [formKey, setFormKey] = useState(0);

  const handleEditType = (type: { id: number; label: string }) => {
    setSelectedType(type.id);
    setEditedType(type.label);
    setIsEditing(true);
  };

  const handleSaveEdit = (value: string) => {
    if (!selectedType) return;

    updateTalkType.mutate(
      { id: selectedType, label: value },
      {
        onSuccess: () => {
          toast.success("Talk type updated successfully!");
          resetForm();
          setFormKey((prev) => prev + 1);
        },
        onError: (error) => {
          toast.error("Error updating talk type: " + error.message);
          console.error("Error updating talk type:", error);
        },
      },
    );
  };

  const handleAddTalkType = (value: string) => {
    createTalkType.mutate(
      { label: value },
      {
        onSuccess: () => {
          toast.success("Talk type added successfully!");
          resetForm();
          setFormKey((prev) => prev + 1);
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

  const resetForm = () => {
    setSelectedType(null);
    setEditedType("");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Talk Types
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
              <TalkTypeForm
                initialValue={editedType}
                isEditing={true}
                isPending={updateTalkType.isPending}
                onSubmit={handleSaveEdit}
                onCancel={resetForm}
              />
            ) : (
              <TalkTypeForm
                key={formKey}
                isPending={createTalkType.isPending}
                onSubmit={handleAddTalkType}
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
  );
}
