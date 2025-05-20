import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Pages/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import MentorDashboard from "./Pages/MentorDashboard/MentorDashboard";
import MentorProfile from "./Pages/SignUpPage/Components/MentorProfile.jsx";
import MenteeProfile from "./Pages/SignUpPage/Components/MenteeProfile.jsx";
import MenteeDashboard from "./Pages/MenteeDashboard/MenteeDashboard.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* SignUp pages for mentors and mentees */}

        <Route path="/mentorprofile" element={<MentorProfile />} />
        <Route path="/menteeprofile" element={<MenteeProfile />} />
        <Route path="/mentordashboard" element={<MentorDashboard />} />
        <Route path="/menteedashboard" element={<MenteeDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
