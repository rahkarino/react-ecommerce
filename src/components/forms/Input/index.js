import React from "react";
import "./styles.scss";

const Input = ({ handleChange, label, type, value, ...otherProps }) => (
  <input
    placeholder={label}
    className="custom-input"
    type={type}
    onChange={handleChange}
    value={value}
    {...otherProps}
  />
);

export default Input;
