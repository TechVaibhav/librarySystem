import React from "react";

const Input = (props) => {
  return (
    <div>
      <div>
        <label> {props.label}</label>

        <input
          type={props.type}
          className="form-control"
          min={props.min}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
      <p style={{ color: "red", marginTop: "3px" }}>{props.errorField}</p>
    </div>
  );
};

export default Input;
