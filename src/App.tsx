import { CalendarView } from "./features/calendar/components/CalendarView";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Talk schedule</h1>
        <p className="text-muted-foreground">View technical talk schedules.</p>
      </header>

      <div className="flex-1">
        <CalendarView className="max-h-[calc(100vh-8rem)]" />
      </div>
    </div>
  );
}

export default App;
