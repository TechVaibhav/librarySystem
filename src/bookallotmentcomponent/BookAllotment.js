import React from "react";
import Button from "../formcomponent/Button";
import Dropdown from "../formcomponent/Dropdown";
import Table from "../formcomponent/Table";

const BookAllotment = (props) => {
  const listOfStudents = props.entry.map((item) => ({
    name: item.student_name,
    value: item.student_name,
  }));
  const booksCategory = Object.keys(props.listOfBooks).map((item) => ({
    name: item,
    value: item,
  }));

  let booksOptions = props.issueBooks.booksoptions.map((item) => ({
    name: item.name,
    value: `${item.name}-${item.quantity}`,
  }));

  return (
    <>
      <br />
      <div className="position">
        <form onSubmit={props.handleSubmit} className="border-shadow">
          <h3>Book allotment form</h3>
          <Dropdown
            items={listOfStudents}
            label="Student name"
            name="student"
            value={props.formValues.student}
            handleChange={props.handleChange}
            errorField={props.error.student}
          />
          <Dropdown
            items={booksCategory}
            label="Category"
            name="category"
            value={props.formValues.category}
            handleChange={props.handleChange}
            errorField={props.error.category}
          />
          <Dropdown
            items={booksOptions}
            label="SelectedBook"
            name="selectedBook"
            value={props.formValues.selectedBook}
            handleChange={props.handleChange}
            errorField={props.error.selectedBook}
          />
          <Button
            alignment="button-alignment"
            type="text"
            button="button"
            text="Submit"
          />
        </form>
        {props.issueBooks.allotedBooks.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Student Name</th>
                <th>Books Name</th>
              </tr>
            </thead>
            {props.issueBooks.allotedBooks.reverse().map((item, index, id) => {
              return (
                <React.Fragment key={index}>
                  <Table
                    display={props.display}
                    entry={props.entry}
                    td1={index + 1}
                    td2={item.student}
                    td3={item.selectedBook}
                  />
                  <button onClick={() => props.handleClickId(item)}>
                    Return
                  </button>
                </React.Fragment>
              );
            })}
          </table>
        )}

        {props.issueBooks.allotedBooks.length > 0 && (
          <Button
            alignment="button-alignment"
            type="text"
            handleMethods={props.handleClearAllAllotments}
            button="button"
            text="Clear Table's Data"
          />
        )}
      </div>
    </>
  );
};

export default BookAllotment;
