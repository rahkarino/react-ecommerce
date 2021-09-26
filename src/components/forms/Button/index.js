import React from "react";
import "./styles.scss";

const Button = ({ children, ...otherProps }) => (
  <div className="form-row">
    <button className="btn" {...otherProps}>
      {children}
    </button>
  </div>
);

export default Button;
