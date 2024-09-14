import "./App.css";
import LandingPage from "./LandingPage";
import { Routes, Route } from "react-router-dom";
import Mira from "./Mira";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mira" element={<Mira />} />
      </Routes>
    </>
  );
}

export default App;
