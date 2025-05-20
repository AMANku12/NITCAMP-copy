import NITCAA from "../../components/NITCAA";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomShapes1 from "../../components/RandomShapes1";

import "./AdminDashboard.css";
import { useState } from "react";
import Analytics from "./Components/Analytics/Analytics";
import MentorDB from "./Components/MentorDB/MentorDB";
import Archives from "./Components/Archives/Archives";
import MenteeDB from "./Components/MenteeDB/MenteeDB";

const dashboardTabs = Object.freeze({
  Analytics: "Analytics",
  Archives: "Archives",
  MentorDB: "MentorDB",
  MenteeDB: "MenteeDB",
});

function AdminDashboard() {
  const [activeButton, setActiveButton] = useState(dashboardTabs.Analytics);

  const handleClick = (component) => {
    setActiveButton(component);
  };
  return (
    <div className="App">
      <NITCAA />
      <RandomShapes1 />

      <div>
        <div class="sidebar">
          <ul>
            {Object.values(dashboardTabs).map((s) => (
              <li key={dashboardTabs}>
                <button
                  className={activeButton === s ? "active" : ""}
                  onClick={() => handleClick(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {activeButton === dashboardTabs.Analytics && <Analytics />}
      {activeButton === dashboardTabs.Archives && <Archives />}
      {activeButton === dashboardTabs.MentorDB && <MentorDB />}
      {activeButton === dashboardTabs.MenteeDB && <MenteeDB />}
    </div>
  );
}

export default AdminDashboard;
