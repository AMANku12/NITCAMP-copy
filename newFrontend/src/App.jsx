import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components & Pages
import Homepage from "./components/Homepage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Events from "./components/Events";
import Profile from "./components/profile.jsx";
import About from "./components/about.jsx";
import Login from "./components/login.jsx";

// Placeholder pages
// const About = () => <div className="p-6">About Page (Coming soon)</div>;
// const Login = () => <div className="p-6">Login Page (Coming soon)</div>;

const App = () => {
  const location = useLocation();
  
  // Check if we're on the /home page - if yes, hide the navbar
  const isHomePage = location.pathname === "/home";
  
  return (
    <>
      {/* Show navbar on all pages EXCEPT /home page */}
      {!isHomePage && <Navbar/>}
      
      <main className="min-h-[80vh] pt-0 ">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
