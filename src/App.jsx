import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Game from "./pages/GamePage/Game";
import Mode from "./pages/Mode/Mode";
import { Choice } from "./pages/Mode/Choice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Mode" element={<Mode />} />
      <Route path="/Game" element={<Choice />} />
    </Routes>
  );
}

export default App;
