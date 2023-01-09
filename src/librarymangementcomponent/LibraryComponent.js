import React, { useState } from "react";
import "../App.css";
import Button from "../formcomponent/Button";
import IssueBooks from "../Issubookscomponent/IssueBooks";
import BookAllotment from "../pages/BookAllotment";
import BookEntries from "../pages/BookEntries";
import StudentEntries from "../pages/StudentEntries";
import ReturnAllotedBooks from "../returnbookscomponent/ReturnAllotedBooks";

const LibraryComponent = () => {
  const tabs = [
    { name: "Student", order: 0 },
    { name: "Book's Entry", order: 1 },
    { name: "Issue Books", order: 2 },
    { name: "Return Books", order: 3 },
  ];

  const [state, setState] = useState({ selectedTab: 0 });
  const handleTabClick = (order) => {
    setState((prevState) => ({
      ...prevState,
      selectedTab: order,
    }));
  };
  const students = [
    {
      student_name: "vaibhav",
      student_Id: "101",
      alloted_books: [],
    },
    {
      student_name: "shivam",
      student_Id: "102",
      alloted_books: [],
    },
    {
      student_name: "shailendra",
      student_Id: "103",
      alloted_books: [],
    },
    {
      student_name: "saquib",
      student_Id: "104",
      alloted_books: [],
    },
    {
      student_name: "anunay",
      student_Id: "105",
      alloted_books: [],
    },
  ];
  const [entry, setEntry] = useState(students);

  const setOfBooks = {
    fictional: [
      { name: "The Maid", quantity: 3 },
      { name: "Olga Dies Dreaming", quantity: 4 },
      { name: "To Paradise", quantity: 1 },
      { name: "Violeta", quantity: 2 },
      { name: "The Magnolia", quantity: 1 },
    ],
    nonfictional: [
      { name: "A Brief History of Time", quantity: 2 },
      { name: "I Know Why the Caged Bird Sings", quantity: 3 },
      { name: "In Cold Blood", quantity: 1 },
      { name: "Bury My Heart at Wounded Knee", quantity: 2 },
      { name: "Hiroshima", quantity: 1 },
    ],
    historical: [
      { name: "The Guns of August", quantity: 2 },
      { name: "The Liberation Trilogy", quantity: 1 },
      { name: "The Crusades", quantity: 4 },
      { name: "Caesar and Christ", quantity: 1 },
      { name: "A History of American People", quantity: 2 },
    ],
  };
  const [listOfBooks, setlistOfBooks] = useState(setOfBooks);

  const [issueBooks, setIssueBooks] = useState({
    studentoptions: [],
    categoryoptions: [],
    booksoptions: [],
    allotedBooks: [],
  });

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <button
                  className="tab_button"
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "40px",
                    backgroundColor:
                      state.selectedTab === index ? "#009999" : "white",
                  }}
                  onClick={() => {
                    handleTabClick(tab.order);
                  }}
                >
                  {tab.name}
                </button>
              );
            })}
        </div>
        {state.selectedTab === 0 && (
          <StudentEntries entry={entry} setEntry={setEntry} />
        )}
        {state.selectedTab === 1 && (
          <BookEntries
            entry={entry}
            listOfBooks={listOfBooks}
            setlistOfBooks={setlistOfBooks}
          />
        )}
        {state.selectedTab === 2 && (
          <IssueBooks
            entry={entry}
            setEntry={setEntry}
            listOfBooks={listOfBooks}
            setlistOfBooks={setlistOfBooks}
            issueBooks={issueBooks}
            setIssueBooks={setIssueBooks}
          />
        )}
        {state.selectedTab === 3 && (
          <ReturnAllotedBooks
            entry={entry}
            setEntry={setEntry}
            listOfBooks={listOfBooks}
            setlistOfBooks={setlistOfBooks}
            issueBooks={issueBooks}
            setIssueBooks={setIssueBooks}
          />
        )}
      </div>
    </>
  );
};

export default LibraryComponent;
