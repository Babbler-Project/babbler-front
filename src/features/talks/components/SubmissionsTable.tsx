import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SubmissionTableItem } from "../types";

interface SubmissionsTableProps {
  submissions: SubmissionTableItem[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  if (!submissions.length) {
    return (
      <div className="text-center py-12 border rounded-md bg-background">
        <p className="text-muted-foreground">No submissions found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell className="font-medium">{submission.title}</TableCell>
              <TableCell>{submission.category}</TableCell>
              <TableCell>{submission.level}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{submission.duration} min</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{submission.submittedAt.formatted}</span>
                  </div>
                  <div className="text-xs">
                    {submission.submittedAt.timeAgo}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("capitalize", submission.statusColor)}
                >
                  {submission.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
