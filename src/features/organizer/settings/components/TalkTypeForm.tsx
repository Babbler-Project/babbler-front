import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import { useState, useEffect } from "react";

interface TalkTypeFormProps {
  initialValue?: string;
  isEditing?: boolean;
  isPending: boolean;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
}

export default function TalkTypeForm({
  initialValue = "",
  isEditing = false,
  isPending,
  onSubmit,
  onCancel,
}: TalkTypeFormProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder={isEditing ? "Edit talk type..." : "Add new talk type..."}
        className="mb-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button
        variant="outline"
        className="mb-4"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          "Saving..."
        ) : isEditing ? (
          <>
            <Save className="h-4 w-4" />
            Save
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add
          </>
        )}
      </Button>
      {isEditing && (
        <Button
          variant="outline"
          className="mb-4"
          onClick={onCancel}
          disabled={isPending}
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      )}
    </div>
  );
}
