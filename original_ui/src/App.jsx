import "./App.css";
import LandingPage from "./LandingPage";
import { Routes, Route } from "react-router-dom";
import Mira from "./Mira";
import ChatPage from "./ChatPage";
import MiraChat from "./MiraChat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mira" element={<MiraChat />} />
      </Routes>
    </>
  );
}

export default App;
