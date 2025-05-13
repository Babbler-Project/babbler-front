import { Route, Routes } from "react-router-dom";
import OrganizerDashboard from "./dashboard/components/OrganizerDashboard";

const OrganizerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<OrganizerDashboard />} />
    </Routes>
  );
};

export default OrganizerRouter;
