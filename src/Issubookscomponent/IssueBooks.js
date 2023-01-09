import React, { useState, useEffect } from "react";
import { validateIssueBook } from "../lib/common/BookAllotmentValidation";
import Button from "../formcomponent/Button";
import Dropdown from "../formcomponent/Dropdown";

const IssueBooks = (props) => {
  const initialvalues = {
    student: "",
    category: "",
    selectedBook: "",
  };
  const [formValues, setFormValues] = useState(initialvalues);

  const [display, setDisplay] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    let studentOptions = props.entry.map((item) => ({
      label: item.student_name,
      value: item.student_name,
    }));

    props.setIssueBooks((prevState) => ({
      ...prevState,
      studentoptions: studentOptions,
      categoryoptions: Object.keys(props.listOfBooks),
      booksoptions: props.listOfBooks["fictional"],
    }));
  }, [props.entry]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (name === "category") {
      props.setIssueBooks((prevState) => ({
        ...prevState,
        booksoptions: props.listOfBooks[value],
      }));
    }
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (formValues.student && formValues.category && formValues.selectedBook) !==
      (null || undefined || "")
    ) {
      let removeBook = props.issueBooks.booksoptions.map((item) => {
        if (item.name === formValues["selectedBook"]) {
          let newBookQuantity = item.quantity - 1;
          if (newBookQuantity > 0) {
            return { name: item.name, quantity: newBookQuantity };
          } else {
            return { name: item.name, quantity: 0 };
          }
        } else {
          return item;
        }
      });
      props.setIssueBooks((prevState) => ({
        ...prevState,
        booksoptions: removeBook,
      }));
      props.setlistOfBooks((prevState) => ({
        ...prevState,
        [formValues.category]: removeBook,
      }));
      setFormValues(initialvalues);
      handleIssueBooks();
    } else {
      setError(validateIssueBook(formValues));
    }
  };
  //allotment of the book to the student
  const handleIssueBooks = () => {
    let studentInfo =
      props.entry &&
      props.entry.find(
        (student) => student.student_name === formValues.student
      );

    if (studentInfo.alloted_books.includes(formValues.selectedBook)) {
      alert("already have this book ....");
    } else {
      let updatedStudentList =
        props.entry &&
        props.entry.map((student) => {
          let studentInfo = student;
          if (studentInfo.student_name === formValues.student) {
            studentInfo.alloted_books.push(formValues.selectedBook);
          }
          return studentInfo;
        });

      props.setEntry(updatedStudentList);
      props.setIssueBooks((prevState) => ({
        ...prevState,
        allotedBooks: updatedStudentList,
      }));
    }
  };
  // console.log("issueBooks.allotedBooks :", props.issueBooks.allotedBooks);

  const listOfStudents = props.entry.map((item) => ({
    name: item.student_name,
    value: item.student_name,
  }));
  const booksCategory = Object.keys(props.listOfBooks).map((item) => ({
    name: item,
    value: item,
  }));

  // let booksOptions = props.issueBooks.booksoptions.map((item) => ({
  //   name: item.name,
  //   value: `${item.name}-${item.quantity}`,
  // }));
  let booksOptions = props.issueBooks.booksoptions.filter((item) => {
    if (item.quantity > 0)
      return {
        item,
      };
  });
 
  let updatedBookOptions = booksOptions.map((item) => {
    return { name: item.name, value: `${item.name}-${item.quantity}` };
  });
  // console.log(updatedBookOptions);

  return (
    <>
      <div className="position">
        <form onSubmit={handleSubmit} className="border-shadow">
          <h3>Issue books</h3>
          <Dropdown
            items={listOfStudents}
            label="Student name"
            name="student"
            value={formValues.student}
            handleChange={handleChange}
            errorField={error.student}
          />
          <Dropdown
            items={booksCategory}
            label="Category"
            name="category"
            value={formValues.category}
            handleChange={handleChange}
            errorField={error.category}
          />
          <Dropdown
            items={updatedBookOptions}
            label="SelectedBook"
            name="selectedBook"
            value={formValues.selectedBook}
            handleChange={handleChange}
            errorField={error.selectedBook}
          />
          <Button
            alignment="button-alignment"
            type="text"
            button="button"
            text="Submit"
          />
        </form>
      </div>
    </>
  );
};

export default IssueBooks;
