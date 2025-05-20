import "./MentorDB.css";
import mentorData from "./mentorData.json";

function EachMentor(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.department}</td>
      <td>{props.mentoringType}</td>
      <td>{props.yearOfEnrollment}</td>
      <td>{props.broad}</td>
      <td>{props.narrow}</td>
    </tr>
  );
}

function MentorDB() {
  return (
    <div>
      <div className="title">Mentor Database</div>
      <div className="big-box">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Mentoring Type</th>
              <th>Year of Enrollment</th>
              <th>Broad Areas of Expertise</th>
              <th>Narrow Areas of Expertise</th>
            </tr>
          </thead>
          <tbody>
            {mentorData.map((mentor) => (
              <EachMentor
                key={mentor.id}
                id={mentor.id}
                name={mentor.name}
                phone={mentor.phone}
                email={mentor.email}
                department={mentor.department}
                mentoringType={mentor.mentoringType}
                yearOfEnrollment={mentor.yearOfEnrollment}
                narrow={mentor.narrow}
                broad={mentor.broad}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MentorDB;
