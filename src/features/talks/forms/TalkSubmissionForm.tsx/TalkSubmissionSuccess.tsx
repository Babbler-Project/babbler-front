import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function TalkSubmissionSuccess() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Alert className="bg-green-50 border-green-200 shadow-sm">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <AlertDescription className="font-medium">
          Your talk proposal has been successfully submitted! We will review it
          soon.
        </AlertDescription>
      </Alert>

      <div className="text-center mt-8">
        <Button
          onClick={() => (window.location.href = "/speaker")}
          variant="outline"
          size="lg"
        >
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
