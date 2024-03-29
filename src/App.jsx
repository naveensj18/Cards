import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Game from "./pages/GamePage/Game";
import Mode from "./pages/Mode/Mode";
import { Choice } from "./pages/Mode/Choice";
import { About } from "./pages/AboutPage/About";
import TwoPlayerMode from "./pages/TwoPlayer/TwoPlayerMode";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Mode" element={<Mode />} />
      <Route path="/Game" element={<Choice />} />
      <Route path="/TwoPlayerMode" element={<TwoPlayerMode />} />
    </Routes>
  );
}

export default App;
