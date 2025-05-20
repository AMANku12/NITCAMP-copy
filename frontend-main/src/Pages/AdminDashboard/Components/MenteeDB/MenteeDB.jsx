import "./MenteeDB.css";
import menteeData from "./menteeData.json";

function EachMentee(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.department}</td>
      <td>{props.roll}</td>
      <td>{props.currentYear}</td>
      <td>{props.broad}</td>
      <td>{props.narrow}</td>
    </tr>
  );
}

function MenteeDB() {
  return (
    <div>
      <div className="title">Mentee Database</div>
      <div className="big-box">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Roll Number</th>
              <th>Current Year</th>
              <th>Broad Areas of Expertise</th>
              <th>Narrow Areas of Expertise</th>
            </tr>
          </thead>
          <tbody>
            {menteeData.map((mentee) => (
              <EachMentee
                key={mentee.id}
                id={mentee.id}
                name={mentee.name}
                phone={mentee.phone}
                email={mentee.email}
                department={mentee.department}
                currentYear={mentee.currentYear}
                roll={mentee.roll}
                narrow={mentee.narrow}
                broad={mentee.broad}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenteeDB;
