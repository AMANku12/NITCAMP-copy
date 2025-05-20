import NITCAA from "../../components/NITCAA";
import RandomShapes1 from "../../components/RandomShapes1";
import RandomShapes2 from "../../components/RandomShapes2";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import Mentorimg from "../../assets/Mentor.png";
import Menteeimg from "../../assets/Mentee.png";

function SignUpPage() {
  return (
    <div>
      <NITCAA />
      <RandomShapes1 />
      <RandomShapes2 />
      <div className="maincomp">
        <div className="text">
          Hello User, Can you just let us know about your purpose before we
          proceed
        </div>
        <div className="boxes">
          <Link to="/mentorprofile">
            <div className="box1 ">
              <img src={Mentorimg} alt="mentor img" />
              MENTOR
            </div>
          </Link>
          <Link to="/menteeprofile">
            <div className="box2">
              <img src={Menteeimg} alt="mentee img" />
              MENTEE
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
