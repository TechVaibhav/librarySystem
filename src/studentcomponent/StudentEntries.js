import React from "react";
import "../App.css";
import Button from "../formcomponent/Button";
import Input from "../formcomponent/Input";
import Table from "../formcomponent/Table";

const StudentEntries = (props) => {
  return (
    <>
      <br />
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Student Id</th>
            <th>Student Name</th>
            <th>Alloted Books</th>
          </tr>
        </thead>
        {props.entry.map((item, index) => {
          return (
            <Table
              display={props.display}
              entry={props.entry}
              key={index}
              td1={index + 1}
              td2={item.student_Id}
              td3={item.student_name}
              td4={item.alloted_books}
            />
          );
        })}
      </table>
      <div className="position">
        <form onSubmit={props.handleSubmit} className="border-shadow">
          <h3>New Student Entry</h3>
          <Input
            label="Student Name"
            type="text"
            name="student_name"
            value={props.formValues.student_name}
            handleChange={props.handleChange}
            errorField={props.error.student_name}
          />
          <Input
            label="Student Id"
            type="text"
            name="student_Id"
            value={props.formValues.student_Id}
            handleChange={props.handleChange}
            errorField={props.error.student_Id}
          />

          <Button
            alignment="button-alignment"
            type="submit"
            button="button"
            text="Submit Details"
          />
        </form>
      </div>
    </>
  );
};

export default StudentEntries;
