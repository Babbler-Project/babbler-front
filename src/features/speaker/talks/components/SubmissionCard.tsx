import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  Tag,
  User,
  MessageSquare,
  MapPin,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import type { SubmissionTableItem } from "../mapper/submissionsMapper";

interface SubmissionCardProps {
  submission: SubmissionTableItem;
}

// Reusable card info item component
const InfoItem = ({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-1">
    <Icon className="h-3 w-3 text-muted-foreground" />
    <span className="truncate">{children}</span>
  </div>
);

// Card footer by status components
const AcceptedFooter = ({
  schedule,
}: {
  schedule: SubmissionTableItem["schedule"];
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
      <MapPin className="h-3 w-3" />
      <span>{schedule?.room}</span>
    </div>
    <div className="flex items-center gap-1 text-muted-foreground">
      <Calendar className="h-3 w-3" />
      <span>
        {schedule?.date}, {schedule?.startTime} - {schedule?.endTime}
      </span>
    </div>
  </div>
);

const PendingFooter = ({ timeAgo }: { timeAgo: string }) => (
  <div>
    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
      <Clock className="h-3 w-3" />
      <span>Awaiting review</span>
    </div>
    <div className="text-muted-foreground pl-4 mt-0.5">Submitted {timeAgo}</div>
  </div>
);

const RejectedFooter = ({ feedback }: { feedback?: string }) => (
  <div>
    <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
      <MessageSquare className="h-3 w-3" />
      <span>Feedback:</span>
    </div>
    {feedback && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-muted-foreground line-clamp-2 pl-4">
              {feedback}
            </p>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">{feedback}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

export function SubmissionCard({ submission }: SubmissionCardProps) {
  // Determine which footer to render based on status
  const renderFooter = () => {
    switch (submission.status) {
      case "accepted":
        return <AcceptedFooter schedule={submission.schedule} />;
      case "pending":
        return <PendingFooter timeAgo={submission.submittedAt.timeAgo} />;
      case "rejected":
        return submission.feedback ? (
          <RejectedFooter feedback={submission.feedback} />
        ) : null;
      default:
        return <div className="h-6" />; // Fallback for consistent height
    }
  };

  return (
    <Card className="transition-all hover:shadow-md cursor-pointer bg-card flex flex-col py-0 gap-0">
      <CardHeader className="p-3 shrink-0">
        <h3 className="font-medium text-sm line-clamp-2">{submission.title}</h3>
      </CardHeader>

      <CardContent className="p-3 pt-0 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <InfoItem icon={Tag}>{submission.category}</InfoItem>
          <InfoItem icon={User}>{submission.level}</InfoItem>
          <InfoItem icon={Clock}>{submission.duration} min</InfoItem>
        </div>

        {/* Status-specific footer sections with separator */}
        <div className="mt-auto text-xs min-h-18">
          <Separator className="my-2" />
          <div className="pt-1">{renderFooter()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
