import React, { useState, useEffect } from "react";
import Dropdown from "../formcomponent/Dropdown";
import "../App.css";

const DisplayBooks = (props) => {
  const initialvalues = {
    category: "",
    selectedBook: "",
  };
  const [formValues, setFormValues] = useState(initialvalues);
  const [issueBooks, setIssueBooks] = useState({
    categoryoptions: [],
    booksoptions: [],
  });

  useEffect(() => {
    setIssueBooks((prevState) => ({
      ...prevState,
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
  };
  const booksCategory = Object.keys(props.listOfBooks).map((item) => ({
    name: item,
    value: item,
  }));

  let booksOptions = issueBooks.booksoptions.map((item) => ({
    name: item.name,
    // value: `${item.name}-${item.quantity}`,
    value: item.name,
  }));

  return (
    <>
      <br />
      <div className="position">
        <form className="border-shadow">
          <h3>DisplayBooks list</h3>
          <Dropdown
            items={booksCategory}
            label="Category"
            name="category"
            value={formValues.category}
            handleChange={handleChange}
          />
          <Dropdown
            items={booksOptions}
            label="SelectedBook"
            name="selectedBook"
            value={formValues.selectedBook}
            handleChange={handleChange}
          />
        </form>
      </div>
    </>
  );
};

export default DisplayBooks;
