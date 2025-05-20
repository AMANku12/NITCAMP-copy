import NITCAA from "../../components/NITCAA";
import RandomShapes1 from "../../components/RandomShapes1";
import "./MenteeDashboard.css";
import img from "../../assets/nitcaa_logo 1.png";

function MenteeDashboard() {
  var menteename = "Mentee.name.2786";

  return (
    <div>
      <NITCAA />
      <RandomShapes1 />

      <div className="dashboard-content">
        <h2 style={{ fontSize: 24 }}>Welcome, {menteename}</h2>

        <div class="grid-container">
          <div class="grid-item">
            <img src={img} alt="Contact 1" class="contact-image" />
            <div class="contact-details">
              <h2>John Doe</h2>
              <p>Email: john.doe@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div class="grid-item special-item1">
            <h2 className="h2-responsive">
              Feel free to contact your assigned mentor through the details
              mentioned...
            </h2>
          </div>
          <div class="grid-item ">
            <img src={img} alt="Contact 3" class="contact-image" />
            <div class="contact-details">
              <h2>Mike Johnson</h2>
              <p>Email: mike.johnson@example.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div class="grid-item special-item2">
            <div class="feedback">
              <h2 className="h2-responsive">Help us improve</h2>
              <input
                className="feedback-input"
                placeholder="Enter your feedback"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboard;
