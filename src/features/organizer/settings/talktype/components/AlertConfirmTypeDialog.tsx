import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

interface ConfirmDeleteTypeDialogProps {
  handleDeleteTalkType: () => void;
}

export default function ConfirmDeleteTypeDialog(
  props: ConfirmDeleteTypeDialogProps,
) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <X className="h-4 w-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Talk Type</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this talk type? This action will
            delete all associated talks and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={props.handleDeleteTalkType}
            className="bg-red-500 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
