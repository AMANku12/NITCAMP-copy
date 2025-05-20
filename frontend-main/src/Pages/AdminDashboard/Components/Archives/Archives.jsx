import "./Archives.css";
import { useState } from "react";
import archivesData from "./archivesData.json";

function MentorMenteeData(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.mentorName}</td>
      <td>{props.menteeName}</td>
      <td>{props.commonAreasOfInterest.join(", ")}</td>
      <td>{props.yearConnected}</td>
      <td>{props.menteeYearOfPassing}</td>
      <td>{props.stillConnected}</td>
    </tr>
  );
}

function Archives() {
  const [activeYear, setActiveYear] = useState(2023);

  const handleClick = (component) => {
    setActiveYear(component);
  };

  const filteredData = archivesData.filter(
    (data) => data.yearConnected === activeYear
  );
  return (
    <div>
      <div className="archive-head">
        <div className="title"> DATABASE-</div>
        <div className="years">
          <div
            className={activeYear === 2019 ? "activeYear year1" : "year1"}
            onClick={() => handleClick(2019)}
          >
            2019
          </div>
          <div
            className={activeYear === 2020 ? "activeYear year1" : "year1"}
            onClick={() => handleClick(2020)}
          >
            2020
          </div>
          <div
            className={activeYear === 2021 ? "activeYear year1" : "year1"}
            onClick={() => handleClick(2021)}
          >
            2021
          </div>
          <div
            className={activeYear === 2022 ? "activeYear year1" : "year1"}
            onClick={() => handleClick(2022)}
          >
            2022
          </div>
          <div
            className={activeYear === 2023 ? "activeYear year1" : "year1"}
            onClick={() => handleClick(2023)}
          >
            2023
          </div>
        </div>
      </div>

      <div className="big-box">
        <table className="table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Mentor Name</th>
              <th>Mentee Name</th>
              <th>Common Areas of Interest</th>
              <th>Year Connected</th>

              <th>Mentee Year of Passing</th>
              <th>Still Connected?</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <MentorMenteeData
                key={data.id}
                id={data.id}
                mentorName={data.mentorName}
                menteeName={data.menteeName}
                commonAreasOfInterest={data.commonAreasOfInterest}
                yearConnected={data.yearConnected}
                menteeYearOfPassing={data.menteeYearOfPassing}
                stillConnected={data.stillConnected}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Archives;
