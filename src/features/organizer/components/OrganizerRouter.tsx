import { Route, Routes } from "react-router-dom";
import OrganizerLayout from "./OrganizerLayout";
import OrganizerDashboard from "../dashboard/components/OrganizerDashboard";
import { NotFound } from "@/components/shared/navigation/not-found";

const OrganizerRouter = () => {
  return (
    <OrganizerLayout>
      <Routes>
        <Route path="/" element={<OrganizerDashboard />} />
        <Route
          path="/talks/submissions"
          element={<div>Talk Submissions</div>}
        />
        <Route path="/talks/schedule" element={<div>Schedule Planning</div>} />
        <Route path="/speakers" element={<div>Speakers</div>} />
        <Route path="/schedule" element={<div>Schedule</div>} />
        <Route path="/settings" element={<div>Settings</div>} />

        <Route
          path="*"
          element={
            <NotFound
              backLink="/organizer"
              backText="Return to Organizer Dashboard"
            />
          }
        />
      </Routes>
    </OrganizerLayout>
  );
};

export default OrganizerRouter;
