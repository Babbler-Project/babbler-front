import { Route, Routes } from "react-router-dom";
import SpeakerLayout from "./SpeakerLayout";
import SpeakerHomeDashboard from "../dashboard/components/SpeakerHomeDashboard";
import SubmitTalkPage from "@/features/talks/components/SubmitTalkPage";
import MySubmissionsPage from "@/features/talks/components/MySubmissionsPage";
import { NotFound } from "@/components/shared/navigation/not-found";
import SpeakerSchedulePage from "../schedule/components/SpeakerSchedulePage";

const SpeakerRouter = () => {
  return (
    <SpeakerLayout>
      <Routes>
        <Route path="/" element={<SpeakerHomeDashboard />} />
        <Route path="/talks" element={<MySubmissionsPage />} />
        <Route path="/talks/submit" element={<SubmitTalkPage />} />
        <Route path="/schedule" element={<SpeakerSchedulePage />} />
        <Route path="/resources" element={<div>resources</div>} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/settings" element={<div>settings</div>} />

        <Route
          path="*"
          element={
            <NotFound
              backLink="/speaker"
              backText="Return to Speaker Dashboard"
            />
          }
        />
      </Routes>
    </SpeakerLayout>
  );
};

export default SpeakerRouter;
