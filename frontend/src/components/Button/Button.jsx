import React from "react";
import "./Button.css";
import classNames from "classnames";

const Button = ({ content, primary, outline }) => {
  return (
    <button
      className={classNames("btn-custom", {
        "btn-primary": primary,
        "btn-outline": outline,
      })}
    >
      {content}
    </button>
  );
};

export default Button;
