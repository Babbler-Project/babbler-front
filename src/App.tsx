import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrganizerRouter from "./features/organizer/components/OrganizerRouter";
import SpeakerRouter from "./features/speaker/components/SpeakerRouter";
import LoginPage from "./features/auth/Login";
import RegisterPage from "./features/auth/Register";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/organizer/*" element={<OrganizerRouter />} />
          <Route path="/speaker/*" element={<SpeakerRouter />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
