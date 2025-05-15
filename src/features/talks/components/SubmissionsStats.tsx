import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Clock, MessageSquare, FileText } from "lucide-react";
import { useSubmissions } from "../hooks/useTalkSubmissions";
import { Skeleton } from "@/components/ui/skeleton";
import { mapSubmissionsToStats } from "../mapper/submissionsStatsMapper";

export function SubmissionsStats() {
  const { submissions, isLoading } = useSubmissions();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
      </div>
    );
  }

  const stats = mapSubmissionsToStats(submissions);

  const statCards = [
    {
      title: "Total Submissions",
      value: stats.totalCount,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Scheduled Talks",
      value: stats.acceptedCount,
      percentage: `${stats.acceptedPercentage}%`,
      icon: <Check className="h-4 w-4" />,
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Pending Review",
      value: stats.pendingCount,
      icon: <Clock className="h-4 w-4" />,
      accent: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Speaker Minutes",
      value: stats.totalMinutes,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    // {
    //   title: "Refused Talks",
    //   value: stats.refusedCount,
    //   icon: <XCircle className="h-4 w-4" />,
    //   accent: "text-red-600 dark:text-red-400",
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden border shadow-sm gap-2">
          <CardHeader className="pb-2 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="rounded-md bg-muted p-1.5">
                  <div className="text-muted-foreground">{stat.icon}</div>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <h3 className={`text-2xl font-semibold ${stat.accent || ""}`}>
                {stat.value}
              </h3>
              {stat.percentage && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({stat.percentage})
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
