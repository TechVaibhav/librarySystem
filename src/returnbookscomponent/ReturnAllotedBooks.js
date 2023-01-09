import React, { useState } from "react";
import Dropdown from "../formcomponent/Dropdown";
import "../App.css";
import Button from "../formcomponent/Button";

const ReturnAllotedBooks = (props) => {
  // console.log("props :", props);

  const initialValues = {
    student: "",
    category: "",
    books_name: "",
  };

  const [returnEntry, setReturnEntry] = useState(initialValues);

  const studentsList =
    props.entry &&
    props.entry.map((item) => ({
      name: item.student_name,
      value: item.student_name,
    }));
  // console.log("studentsList :", studentsList);

  const booksCategory = Object.keys(props.listOfBooks).map((item) => ({
    name: item,
    value: item,
  }));
  console.log("booksCategory :", booksCategory);

  let booksOptions = props.issueBooks.booksoptions.map((item) => ({
    name: item.name,
    value: item.name,
  }));
  // console.log("booksOptions :", booksOptions);

  const handleChange = (e) => {
    setReturnEntry((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log("returnEntry :", returnEntry);

  const studentSelected = props.entry.findIndex(
    (e) => e.student_name === returnEntry.student
  );
  // console.log(props.entry[studentSelected]);

  const selectedBookName = [];
  if (studentSelected !== -1 && returnEntry.category) {
    const categoryBooks = props.listOfBooks[returnEntry.category];
    console.log(categoryBooks);
    for (let categorybook of categoryBooks) {
      if (
        props.entry[studentSelected].alloted_books.includes(categorybook.name)
      ) {
        selectedBookName.push({
          name: categorybook.name,
          value: categorybook.name,
        });
      }
    }
  }

  // console.log(selectedBookName);

  const handleReturn = (e) => {
    e.preventDefault();
    const filterBookReturn = props.entry[studentSelected].alloted_books.filter(
      (book) => book !== returnEntry.books_name
    );
    var updatedStudentList =
      props.entry &&
      props.entry.map((student) => {
        if (
          student.student_name.toLowerCase() ===
          returnEntry.student.toLowerCase()
        ) {
          return {
            ...student,
            alloted_books: filterBookReturn,
          };
        }
        return student;
      });
    // console.log(updatedStudentList);
    props.setEntry((prevState) => [...updatedStudentList]);

    let booksoptions = props.issueBooks.booksoptions.filter(
      (book) => book.name
    );
   
    let findBookStatus = props.issueBooks.booksoptions.findIndex(
      (item) => item.name === returnEntry.books_name
    );
    props.setIssueBooks((prevState) => ({
      ...prevState,
      booksoptions:
        findBookStatus === -1
          ? [...booksoptions, { name: returnEntry.books_name, quantity: 1 }]
          : [
              ...booksoptions,
              (prevState.booksoptions[findBookStatus] = {
                name: prevState.booksoptions[findBookStatus].name,
                quantity: prevState.booksoptions[findBookStatus].quantity + 1,
              }),
            ],
    }));
  };
  // console.log(props.entry);
  // console.log(props.listOfBooks);
  return (
    <>
      <div className="position">
        <form onSubmit={handleReturn} className="border-shadow">
          <h3>Return alloted books</h3>
          <Dropdown
            items={studentsList}
            label="Student name"
            name="student"
            value={returnEntry.student}
            handleChange={handleChange}
            // errorField={error.student}
          />
          <Dropdown
            items={booksCategory}
            label="Books category"
            name="category"
            value={returnEntry.category}
            handleChange={handleChange}
            // errorField={error.student}
          />
          <Dropdown
            items={selectedBookName}
            label="Book name"
            name="books_name"
            value={returnEntry.books_name}
            handleChange={handleChange}
            // errorField={error.student}
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

export default ReturnAllotedBooks;
