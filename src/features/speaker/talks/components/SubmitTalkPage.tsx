import TalkSubmissionForm from "../forms/TalkSubmissionForm.tsx";

export default function SubmitTalkPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit a talk</h1>
        <p className="text-muted-foreground">
          Fill out the form below to submit your talk proposal.
        </p>
      </div>

      <TalkSubmissionForm />
    </div>
  );
}
