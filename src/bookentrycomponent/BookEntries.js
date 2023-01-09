import React from "react";
import "../App.css";
import Button from "../formcomponent/Button";
import Table from "../formcomponent/Table";
import Input from "../formcomponent/Input";
import Dropdown from "../formcomponent/Dropdown";


const BookEntries = (props) => {
  const booksCategory = Object.keys(props.listOfBooks).map((item) => ({
    name: item,
    value: item,
  }));
  const setOflistOfbooks = Object.values(props.listOfBooks);
  // console.log("setOflistOfbooks :", setOflistOfbooks);
  const completeData = Object.keys(props.listOfBooks);
  // console.log("completeData", completeData);

  return (
    <>
      <br />
      <div className="position">
        <form onSubmit={props.handleSubmit} className="border-shadow">
          <h3>New Books Entry</h3>
          <Input
            label="Book's name"
            type="text"
            name="name"
            value={props.books.name}
            handleChange={props.handleChange}
            errorField={props.error.name}
          />
          <Input
            label="Quantity"
            type="number"
            min="1"
            name="quantity"
            value={props.books.quantity}
            handleChange={props.handleChange}
            errorField={props.error.quantity}
          />
          <Dropdown
            items={booksCategory}
            label="Category"
            name="category"
            value={props.books.category}
            handleChange={props.handleChange}
            errorField={props.error.category}
          />
          <Button
            alignment="button-alignment"
            type="submit"
            button="button"
            text="Add-Book"
          />
        </form>
      </div>
    </>
  );
};

export default BookEntries;
