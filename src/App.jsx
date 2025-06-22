import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components & Pages
import Homepage from "./components/Homepage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
// import Events from "./components/Events";
import Menteeprofile from "./components/menteeprofile.jsx";
import About from "./components/about.jsx";
import Choice from "./components/Choice.jsx";
import Login from "./components/login.jsx";
import MenteeRegistrationForm from "./components/menteeregister.jsx";
import MentorRegistrationForm from "./components/mentoregister.jsx";
import MenteeinterestsForm from "./components/menteeinterests.jsx";
import MentorinterestsForm from "./components/mentorinterests.jsx";
import Adminlogin from "./components/adminlogin.jsx";
import AdminPanel from "./components/adminpanel.jsx";
import Profile from "./components/profile.jsx";
import Mentorprofile from "./components/mentorprofile.jsx";



// Placeholder pages
// const About = () => <div className="p-6">About Page (Coming soon)</div>;
// const Login = () => <div className="p-6">Login Page (Coming soon)</div>;

const App = () => {
  const location = useLocation();
  
  // Check if we're on the /adminpge - if yes, hide the navbar
  const hideNavbarPaths = ["/home", "/adminpanel", "/adminlogin"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {/* Show navbar on all pages EXCEPT /home page */}
      {!shouldHideNavbar && <Navbar />}
      
      <main className="min-h-[80vh] pt-0 ">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/menteeprofile" element={<Menteeprofile />} />
          <Route path="/mentorprofile" element={<Mentorprofile />} />
          <Route path="/choice" element={<Choice />}/>
          <Route path="/menteeregister" element={<MenteeRegistrationForm/>} />
          <Route path="/mentoregister" element={<MentorRegistrationForm/>} />
          <Route path="/menteeinterests" element={< MenteeinterestsForm/>} />
          <Route path="/mentorinterests" element={< MentorinterestsForm/>} />
          <Route path="/matching" element={< MentorinterestsForm/>} />
          <Route path="/mentorinterests" element={< MentorinterestsForm/>} />
          <Route path="/adminlogin" element={< Adminlogin/>} />
          <Route path="/adminpanel" element={< AdminPanel/>} />
          <Route path="/profile" element={< Profile/>} />
          
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
