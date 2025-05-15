import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  title?: string;
  description?: string;
  backLink?: string;
  backText?: string;
}

export function NotFound({
  title = "Page not found",
  description = "Sorry, we couldn't find the page you're looking for.",
  backLink = "/",
  backText = "Go back home",
}: NotFoundProps) {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <Button asChild className="mt-8">
        <Link to={backLink}>{backText}</Link>
      </Button>
    </div>
  );
}
