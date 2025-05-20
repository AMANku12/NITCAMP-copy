import NITCAA from "../../../components/NITCAA";
import RandomShapes1 from "../../../components/RandomShapes1";

import "./MentorProfile.css";
// import { Link } from "react-router-dom";

function MentorProfile() {
  return (
    <div>
      <NITCAA />
      <RandomShapes1 />

      <div className="mentor-profile-setup">
        <p style={{ fontWeight: 700, fontSize: 18 }}>
          Please enter the following details:
        </p>
        <p>All the fields marked with asterisks (*) are required.</p>
        <div className="indented-text">Name*</div>
        <input
          type="text"
          placeholder="Enter your name"
          className="input-box1"
        />
        <div className="indented-text">E-mail id*</div>
        <input
          type="text"
          placeholder="Enter your e-mail"
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
        <div className="indented-text">Year Graduated*</div>
        <input
          type="year"
          placeholder="Enter the year"
          className="input-box1"
        />
        <div className="indented-text">Mentee Capacity*</div>
        <input
          type="number"
          placeholder="Enter your capacity"
          className="input-box1"
        />
        <div className="indented-text">Mentoring type*</div>
        <input
          type="text"
          placeholder="Enter your mentoring type"
          className="input-box1"
        />
        <div className="indented-text ">Broad Areas of Expertise*</div>
        <input
          type="text"
          placeholder="Select your broad Areas of expertise"
          className="input-box1"
          style={{ height: "50" }}
        />
        <div className="indented-text ">Narrow Areas of Expertise*</div>
        <input
          type="text"
          placeholder="Select your narrow Areas of expertise"
          className="input-box1"
          style={{ height: "50" }}
        />
        <div className="button">
          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;
