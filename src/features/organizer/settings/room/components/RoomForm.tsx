import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import { useEffect } from "react";
import type { Room } from "@/features/organizer/room/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { roomFormSchema } from "../hooks/useRoomSubmission";

interface RoomFormProps {
  initialValue?: Room | null;
  isEditing?: boolean;
  isPending: boolean;
  onSubmit: (name: string, capacity: number) => void;
  onCancel?: () => void;
}

type FormValues = {
  name: string;
  capacity: number;
};

export default function RoomForm({
  initialValue = null,
  isEditing = false,
  isPending,
  onSubmit,
  onCancel,
}: RoomFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      capacity: 0,
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.reset({
        name: initialValue.name,
        capacity: initialValue.capacity,
      });
    } else {
      form.reset({
        name: "",
        capacity: 0,
      });
    }
  }, [initialValue, form]);

  const onFormSubmit = form.handleSubmit((data) => {
    onSubmit(data.name, data.capacity);
  });

  return (
    <Form {...form}>
      <form className="flex items-start gap-2" onSubmit={onFormSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4 flex-1">
              <FormControl>
                <Input
                  placeholder={isEditing ? "Edit room name..." : "Room name"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem className="mb-4 flex-1">
              <FormControl>
                <Input
                  type="number"
                  placeholder={isEditing ? "Edit capacity..." : "Room capacity"}
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="mb-4"
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
            type="button"
            variant="outline"
            className="mb-4"
            onClick={onCancel}
            disabled={isPending}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}
