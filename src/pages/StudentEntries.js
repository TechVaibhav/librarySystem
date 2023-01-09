import React, { useState } from "react";
import Student from "../studentcomponent/StudentEntries";
import { validateStudent } from "../lib/common/StudentValidation";

const StudentEntries = (props) => {
  const initialvalues = {
    student_name: "",
    student_Id: "",
    alloted_books: [],
  };

  const [formValues, setFormValues] = useState(initialvalues);
  const [error, setError] = useState({});
  const [display, setDisplay] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (formValues.student_name && formValues.student_Id) !==
      (null || undefined || "")
    ) {
      props.setEntry([...props.entry, formValues]);
      setFormValues(initialvalues);
    } else {
      setError(validateStudent(formValues));
    }
  };

  return (
    <>
      <div>
        <Student
          entry={props.entry}
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          display={display}
        />
      </div>
    </>
  );
};

export default StudentEntries;
