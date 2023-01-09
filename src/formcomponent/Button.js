import React from "react";

const Button = (props) => {
  return (
    <>
      <div className={props.alignment}>
        <button
          onClick={props.handleMethods}
          type={props.type}
          className={props.button}
        >
          {props.text}
        </button>
      </div>
    </>
  );
};

export default Button;
