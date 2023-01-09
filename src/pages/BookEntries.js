import React, { useState } from "react";
import Books from "../bookentrycomponent/BookEntries";
import DisplayBooks from "../bookentrycomponent/DisplayBooks";
import { validateEntry } from "../lib/common/BookEntriesValidation";

const BookEntries = (props) => {
  const initialvalues = { name: "", quantity: 0, category: "" };
  const [books, setBooks] = useState(initialvalues);
  const [display, setDisplay] = useState(true);
  const [error, setError] = useState({});

  //while the time of input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBooks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(false);
  };

  //while the time of button click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (books.name && books.quantity && books.quantity > 0 && books.category) !==
      (null || undefined || "")
    ) {
      console.log(
        `book's name :${books.name}  book's quantity :${books.quantity} and book's category :${books.category}`
      );
      props.setlistOfBooks((prevState) => ({
        ...prevState,
        [books.category]: [
          ...prevState[books.category],
          {
            name: books.name,
            quantity: books.quantity,
          },
        ],
      }));
      setBooks(initialvalues);
    } else {
      setError(validateEntry(books));
    }
  };

  return (
    <>
      <div>
        <Books
          listOfBooks={props.listOfBooks}
          books={books}
          error={error}
          display={display}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <DisplayBooks {...props} />
      </div>
    </>
  );
};

export default BookEntries;
