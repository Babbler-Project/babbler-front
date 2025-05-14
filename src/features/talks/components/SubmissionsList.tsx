import { useSubmissions } from "../hooks/useTalkSubmissions";
import { SubmissionsKanban } from "./SubmissionsKanban";
import { SubmissionCard } from "./SubmissionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { type TalkSubmissionStatus } from "../types";
import {
  mapSubmissionsToTableItems,
  statusColorMap,
} from "../mapper/submissionsMapper";
import type { SubmissionTableItem } from "../types";

function SubmissionsGrid({
  submissions,
  statusLabel,
}: {
  submissions: SubmissionTableItem[];
  statusLabel: string;
}) {
  if (!submissions.length) {
    return (
      <div className="text-center py-8 border rounded-md bg-background">
        <p className="text-muted-foreground">
          No {statusLabel} submissions found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}

export function SubmissionsList() {
  const { submissions, isLoading, error, getSubmissionsByStatus } =
    useSubmissions();

  const statusTabs: { value: TalkSubmissionStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ];

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">
                {tab.value === "all"
                  ? submissions.length
                  : getSubmissionsByStatus(tab.value).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {statusTabs.map((tab) => {
              const filteredSubmissions =
                tab.value === "all"
                  ? submissions
                  : getSubmissionsByStatus(tab.value);

              const tableItems =
                mapSubmissionsToTableItems(filteredSubmissions);

              return (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.value === "all" ? (
                    <SubmissionsKanban
                      submissions={tableItems}
                      statusColors={statusColorMap}
                    />
                  ) : (
                    <SubmissionsGrid
                      submissions={tableItems}
                      statusLabel={tab.value}
                    />
                  )}
                </TabsContent>
              );
            })}
          </>
        )}
      </Tabs>
    </div>
  );
}
