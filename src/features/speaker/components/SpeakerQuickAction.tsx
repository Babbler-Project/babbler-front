import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SpeakerQuickAction() {
  return (
    <Button
      asChild
      className={cn(
        "w-full gap-2 font-medium",
        "group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:font-normal group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-foreground group-data-[collapsible=icon]:shadow-none",
      )}
      size="lg"
    >
      <Link to="/speaker/talks/submit">
        <MessageSquareIcon className="h-4 w-4 shrink-0" />
        <span className="group-data-[collapsible=icon]:hidden overflow-hidden">
          Submit new talk
        </span>
      </Link>
    </Button>
  );
}
