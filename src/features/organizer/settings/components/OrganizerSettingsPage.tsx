import { useTalkTypes } from "@/features/talks/talkTypes/hooks/queries/useGetTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrganizerSettingsPage() {
  const { data: talkTypes, isLoading, error } = useTalkTypes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Organizer Settings</h1>
        <p className="text-muted-foreground">
          Configure talk types and other settings for your event.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Talk Types</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error ? (
            <div className="text-red-500">
              Error loading talk types: {error.message}
            </div>
          ) : (
            <div className="space-y-4">
              {talkTypes?.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <Badge variant="outline">{type.label}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
