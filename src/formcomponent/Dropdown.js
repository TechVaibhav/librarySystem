import React from "react";
import "../App.css";
const Dropdown = (props) => {
  return (
    <>
      <div>
        <label>
          {props.label}
          <div className="search_categories">
            <div className="select">
              <select
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
              >
                <option>Choose options</option>
                {props.items &&
                  props.items.map(
                    (item, index) =>
                      item.name && (
                        <option key={index} value={item.name}>
                          {item.value}
                        </option>
                      )
                  )}
              </select>
            </div>
          </div>
        </label>
        <p style={{ color: "red", marginTop: "3px" }}>{props.errorField}</p>
      </div>
    </>
  );
};

export default Dropdown;
