import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrganizerRouter from "./features/organizer/OrganizerRouter";

function App() {
  return (
    // <div className="min-h-screen bg-background flex flex-col p-4">
    //   <header className="mb-6">
    //     <h1 className="text-2xl font-bold">Talk schedule</h1>
    //     <p className="text-muted-foreground">View technical talk schedules.</p>
    //   </header>

    //   <div className="flex-1">
    //     <CalendarView className="max-h-[calc(100vh-8rem)]" />
    //   </div>

    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/organizer/*" element={<OrganizerRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
