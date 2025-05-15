import { SubmissionsList } from "./SubmissionsList";
import { SubmissionsStats } from "./SubmissionsStats";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MySubmissionsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">My talk submissions</h1>
          <p className="text-muted-foreground">
            Track and manage your submitted talk proposals
          </p>
        </div>

        <Button size="sm" asChild>
          <Link to="/speaker/talks/submit">
            <PlusCircle className="h-4 w-4" />
            Submit new talk
          </Link>
        </Button>
      </div>

      <SubmissionsStats />
      <SubmissionsList />
    </div>
  );
}
