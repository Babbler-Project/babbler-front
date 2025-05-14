import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrganizerRouter from "./features/organizer/components/OrganizerRouter";
import SpeakerRouter from "./features/speaker/components/SpeakerRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/organizer/*" element={<OrganizerRouter />} />
          <Route path="/speaker/*" element={<SpeakerRouter />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
