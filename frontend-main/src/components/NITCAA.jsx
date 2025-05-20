import logo from "../assets/nitcaa_logo 1.png";
import "./NITCAA.css";

function NITCAA() {
  return (
    <div className="comp">
      <div className="image">
        <img src={logo} alt="nit_logo" />
      </div>
      <div className="text">
        <h1 className="h1"> NITC ALumni Mentoring Programme</h1>
        <h2 className="h2">National Institute of Technology, Calicut</h2>
        <h3 className="h3"> An Initiative by the NITCAA</h3>
        <h4 className="h4">
          (National Institute of Technology, Calicut Alumni Association)
        </h4>
      </div>
    </div>
  );
}

export default NITCAA;
