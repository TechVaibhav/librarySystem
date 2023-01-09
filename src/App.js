import "./App.css";
import LibraryComponent from "./librarymangementcomponent/LibraryComponent";

const App = () => {
  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to Library Management System
      </h3>
      <LibraryComponent />
    </>
  );
};

export default App;
