import NITCAA from "../../components/NITCAA";
import RandomShapes1 from "../../components/RandomShapes1";
import "./MentorDashboard.css";
import image1 from "../../assets/nitcaa_logo 1.png";
import MenteeCard from "./MenteeCard";

function MentorDashboard() {
  const mentorname = "Mentor.name.2786";

  return (
    <div>
      <NITCAA />
      <RandomShapes1 />
      <div className="dashboard-content">
        <h2>Welcome, {mentorname}</h2>
        <h3> These are the students that come under your mentorship.</h3>
        <div class="grid-container">
          <MenteeCard
            img={image1}
            name="Nisheeth Nayan"
            email="nisheeth@gmail.com"
            num="7294621062"
          />
          <MenteeCard
            img={image1}
            name="Nisheeth Nayan"
            email="nisheeth@gmail.com"
            num="7294621062"
          />
          <MenteeCard
            img={image1}
            name="Nisheeth Nayan"
            email="nisheeth@gmail.com"
            num="7294621062"
          />
          <MenteeCard
            img={image1}
            name="Nisheeth Nayan"
            email="nisheeth@gmail.com"
            num="7294621062"
          />
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
