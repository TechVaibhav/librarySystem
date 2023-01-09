import React, { useState, useEffect } from "react";
import Allotment from "../bookallotmentcomponent/BookAllotment";
import { validateIssueBook } from "../lib/common/BookAllotmentValidation";

const BookAllotment = (props) => {
  const initialvalues = {
    student: "",
    category: "",
    selectedBook: "",
  };
  const [formValues, setFormValues] = useState(initialvalues);

  const [issueBooks, setIssueBooks] = useState({
    studentoptions: [],
    categoryoptions: [],
    booksoptions: [],
    allotedBooks: [],
  });

  const [display, setDisplay] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    let studentOptions = props.entry.map((item) => ({
      label: item.student_name,
      value: item.student_name,
    }));

    setIssueBooks((prevState) => ({
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
      setIssueBooks((prevState) => ({
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
      let removeBook = issueBooks.booksoptions.map((item) => {
        if (item.name === formValues["selectedBook"]) {
          let newBookQuantity = item.quantity - 1;
          if (newBookQuantity > 0) {
            return { name: item.name, quantity: newBookQuantity };
          } else {
            return {};
          }
        } else {
          return item;
        }
      });
      setIssueBooks((prevState) => ({
        ...prevState,
        booksoptions: removeBook,
        allotedBooks: [...prevState.allotedBooks, formValues],
      }));
      props.setlistOfBooks((prevState) => ({
        ...prevState,
        [formValues.category]: removeBook,
      }));
      setFormValues(initialvalues);
    } else {
      setError(validateIssueBook(formValues));
    }
  };
  const handleClearAllAllotments = () => {
    setIssueBooks((prevState) => ({
      ...prevState,
      allotedBooks: [],
    }));
  };

  //Return a book by the student
  const handleClickId = (id) => {
    let fileteredBooks = issueBooks.allotedBooks.filter(
      (item) => item.selectedBook !== id.selectedBook
    );

    setIssueBooks((prevState) => ({
      ...prevState,
      allotedBooks: fileteredBooks,
    }));
    //find the status of the book in table
    let findBookStatus = issueBooks.booksoptions.findIndex(
      (item) => item.name === id.selectedBook
    );
    let booksoptions = issueBooks.booksoptions.filter((book) => book.name);
    props.setlistOfBooks((prevState) => ({
      ...prevState,
      [id.category]: [...booksoptions, { name: id.selectedBook, quantity: 1 }],
    }));
    setIssueBooks((prevState) => ({
      ...prevState,
      booksoptions:
        findBookStatus === -1
          ? [...booksoptions, { name: id.selectedBook, quantity: 1 }]
          : [
              ...booksoptions,
              (prevState.booksoptions[findBookStatus] = {
                name: prevState.booksoptions[findBookStatus].name,
                quantity: prevState.booksoptions[findBookStatus].quantity + 1,
              }),
            ],
    }));
  };
  return (
    <>
      <div>
        <Allotment
          formValues={formValues}
          issueBooks={issueBooks}
          display={display}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClickId={handleClickId}
          handleClearAllAllotments={handleClearAllAllotments}
          {...props}
        />
      </div>
    </>
  );
};

export default BookAllotment;
