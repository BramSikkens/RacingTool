import "@fontsource/roboto";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "reflect-metadata";
import "./App.css";
import DeelnemersTable from "./Components/DeelnemersTable";
import MainSection from "./Components/MainSection";
import AddRaceModal from "./Components/Modals/AddRaceModal";
import RaceTable from "./Components/RaceTable";
import MainView from "./Views/MainView";
import WelcomeView from "./Views/WelcomeView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeView />} />
          <Route path="/races" element={<MainView />}>
            <Route path=":raceTitle" element={<MainSection />}>
              <Route path="rondes/:rondeTitle" element={<RaceTable />} />
              <Route path="deelnemers" element={<DeelnemersTable />} />
            </Route>
            <Route path="add" element={<AddRaceModal />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
