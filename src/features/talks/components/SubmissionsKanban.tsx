import { Badge } from "@/components/ui/badge";
import { SubmissionCard } from "./SubmissionCard";
import type { SubmissionTableItem } from "../mapper/submissionsMapper";

interface SubmissionsKanbanProps {
  submissions: SubmissionTableItem[];
  statusColors: Record<string, string>;
}

export function SubmissionsKanban({
  submissions,
  statusColors,
}: SubmissionsKanbanProps) {
  const submissionsByStatus = submissions.reduce<
    Record<string, SubmissionTableItem[]>
  >((acc, submission) => {
    if (!acc[submission.status]) {
      acc[submission.status] = [];
    }
    acc[submission.status].push(submission);
    return acc;
  }, {});

  // If no submissions
  if (!submissions.length) {
    return (
      <div className="text-center py-12 border rounded-md bg-background">
        <p className="text-muted-foreground">No submissions found</p>
      </div>
    );
  }

  const statusColumns = [
    { status: "pending", title: "Pending" },
    { status: "accepted", title: "Accepted" },
    { status: "rejected", title: "Rejected" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
      {statusColumns.map((column) => (
        <div
          key={column.status}
          className="flex flex-col rounded-md bg-muted/20 border border-border/30 h-[calc(100vh-15rem)] max-h-[800px]"
        >
          <div className="flex items-center gap-2 p-3 sticky top-0 bg-muted/50 backdrop-blur-sm border-b border-border/30 rounded-t-md">
            <h3 className="font-medium text-sm uppercase">{column.title}</h3>
            <Badge variant="outline" className={statusColors[column.status]}>
              {submissionsByStatus[column.status]?.length || 0}
            </Badge>
          </div>

          <div className="p-2 overflow-y-auto flex-1 space-y-2">
            {submissionsByStatus[column.status]?.map((submission) => (
              <div
                key={submission.id}
                className="hover:-translate-y-0.5 transition-transform duration-150"
              >
                <SubmissionCard submission={submission} />
              </div>
            ))}

            {!submissionsByStatus[column.status]?.length && (
              <div className="text-center py-8 rounded-md bg-background/50 border border-dashed border-border/40 flex items-center justify-center mx-1 mt-2">
                <p className="text-muted-foreground text-sm">
                  No {column.status} submissions
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
