import "./App.css";
import MiraLanding from "./MiraLanding";
import { Routes, Route } from "react-router-dom";
import Mira from "./Mira";
import ChatPage from "./ChatPage";
import MiraChat from "./MiraChat";
import LandingPage from "./LandingPage";
import Sara from "./SaraLanding";
import DheeraLanding from "./DheeraLanding";
import MiraVoice from "./MiraVoice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mira" element={<MiraLanding />} />
        <Route path="/mira/chat" element={<Mira />} />
        <Route path="/mira/voice" element={<MiraVoice />} />
        <Route path="/sara" element={<Sara />} />
        <Route path="/dheera" element={<DheeraLanding />} />
      </Routes>
    </>
  );
}

export default App;
