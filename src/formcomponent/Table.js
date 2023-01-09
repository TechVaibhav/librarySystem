import React from "react";

const Table = (props) => {
  return (
    <>
      {props.display && props.entry ? (
        <tbody key={props.td1 + 1}>
          <tr>
            <td>{props.td1}</td>
            <td>{props.td2}</td>
            <td>{props.td3}</td>
            {props.td4.length > 0 ? (
              <td>{props.td4.join(", ")}</td>
            ) : (
              <td style={{ color: "red" }}>No books are allocated</td>
            )}
          </tr>
        </tbody>
      ) : (
        props.display && <h5>No data found</h5>
      )}
    </>
  );
};

export default Table;
