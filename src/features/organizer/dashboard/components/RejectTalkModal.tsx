import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, AlertOctagon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Talk } from "@/features/talks/types";
import { useRejectTalk } from "@/features/talks/hooks/mutations/useRejectedTalk";
import {
  rejectTalkSchema,
  type RejectTalkFormValues,
} from "@/features/talks/schemas/rejectTalkSchema";

interface RejectTalkModalProps {
  talk: Talk | null;
  isOpen: boolean;
  onClose: () => void;
}

const RejectTalkModal = ({ talk, isOpen, onClose }: RejectTalkModalProps) => {
  const form = useForm<RejectTalkFormValues>({
    resolver: zodResolver(rejectTalkSchema),
    defaultValues: {
      message: "",
    },
  });

  const rejectTalkMutation = useRejectTalk();

  const handleReject = (values: RejectTalkFormValues) => {
    if (!talk) return;

    rejectTalkMutation.mutate(
      {
        talkId: parseInt(talk.id),
        message: values.message,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  const onCloseModal = () => {
    form.reset();
    onClose();
  };

  const isPending = rejectTalkMutation.isPending;

  return (
    <Dialog
      open={isOpen && !!talk}
      onOpenChange={(open) => !open && onCloseModal()}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertOctagon className="h-5 w-5" />
            Reject Talk
          </DialogTitle>
          <DialogDescription>
            Please provide feedback for the speaker about why this talk was
            rejected.
          </DialogDescription>
        </DialogHeader>

        {talk && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleReject)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h3 className="font-medium">{talk.title}</h3>
                <div className="text-sm text-muted-foreground">
                  <span>by {talk.speaker}</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">{talk.durationDisplay}</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {talk.level}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {talk.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide constructive feedback for the speaker..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={onCloseModal}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isPending || !form.formState.isValid}
                  className="gap-1"
                >
                  {isPending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <X className="h-4 w-4" />
                      Reject Talk
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RejectTalkModal;
