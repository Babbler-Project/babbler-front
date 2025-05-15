import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  talkTypeSchema,
  type TalkTypeFormValues,
} from "../hooks/useTalkTypeSubmission";

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
  const form = useForm<TalkTypeFormValues>({
    resolver: zodResolver(talkTypeSchema),
    defaultValues: {
      label: initialValue,
    },
  });

  useEffect(() => {
    form.reset({
      label: initialValue,
    });
  }, [initialValue, form]);

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data.label);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex items-start gap-2">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex-1 mb-4">
              <FormControl>
                <Input
                  placeholder={
                    isEditing ? "Edit talk type..." : "Add new talk type..."
                  }
                  {...field}
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
