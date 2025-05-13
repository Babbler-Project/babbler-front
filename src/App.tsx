import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrganizerRouter from "./features/organizer/components/OrganizerRouter";
import SpeakerRouter from "./features/speaker/components/SpeakerRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/organizer/*" element={<OrganizerRouter />} />
        <Route path="/speaker/*" element={<SpeakerRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
