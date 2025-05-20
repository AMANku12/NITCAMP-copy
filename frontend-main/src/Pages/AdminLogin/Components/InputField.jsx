import "./InputField.css";
import React from "react";
import { Link } from "react-router-dom";

function InputField() {
  return (
    <div className="input-field1">
      <h1 className="h1text" style={{ fontSize: 24, display: "static" }}>
        Admin Credentials
      </h1>

      <h3 className="indented-text">UserName</h3>
      <input className="input-box" type="text" placeholder="Enter your name" />
      <h3 className="indented-text">Password</h3>
      <input
        className="input-box"
        type="password"
        placeholder="Enter your password"
      />

      <Link to="/dashboard">
        <button className="btn">Proceed</button>
      </Link>
    </div>
  );
}

export default InputField;
