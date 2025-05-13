import { Route, Routes } from "react-router-dom";
import SpeakerHomeDashboard from "./dashboard/components/SpeakerHomeDashboard";
import SubmitTalkPage from "./talks/components/SubmitTalkPage";

const SpeakerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SpeakerHomeDashboard />} />
      <Route path="/submit-talk" element={<SubmitTalkPage />} />
    </Routes>
  );
};

export default SpeakerRouter;
