import NITCAA from "../../../components/NITCAA";
import RandomShapes1 from "../../../components/RandomShapes1";

import "./MenteeProfile.css";
// import { Link } from "react-router-dom";

function MenteeProfile() {
  return (
    <div>
      <NITCAA />
      <RandomShapes1 />
      <div className="mentee-profile-setup">
        <h2>Please enter the following details:</h2>
        <p>All the fields marked with asterisks (*) are required.</p>
        <div className="indented-text">Name*</div>
        <input
          type="text"
          placeholder="Enter your name"
          className="input-box1"
        />
        <div className="indented-text">E-mail id*</div>
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="input-box1"
        />
        <div className="indented-text">Roll Number*</div>
        <input
          type="text"
          placeholder="Enter your roll number"
          className="input-box1"
        />
        <div className="indented-text">Whatsapp Number*</div>
        <input
          type="number"
          placeholder="Enter your number"
          className="input-box1"
        />
        <div className="indented-text">Department*</div>
        <input
          type="text"
          placeholder="Enter your department"
          className="input-box1"
        />
        <div className="indented-text">Academic Year*</div>
        <select placeholder="Enter the year" className="input-box1">
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <div className="indented-text">Year Graduating*</div>
        <input
          type="year"
          placeholder="Enter your graduation year"
          className="input-box1"
        />
        <div className="indented-text ">Areas of Interest*</div>
        <input
          type="text"
          placeholder="Select your Areas of interest"
          className="input-box1"
          style={{ height: "100px" }}
        />
        <div className="indented-text">
          What are your expectations from this programme
        </div>
        <input type="text" placeholder="(Optional)" className="input-box1" />

        <div className="button">
          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
