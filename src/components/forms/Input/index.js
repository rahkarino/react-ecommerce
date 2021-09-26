import React from "react";
import "./styles.scss";

const Input = ({ handleChange, label, type, value, ...otherProps }) => (
  <div className="form-row">
    {/* {label && <label>{label}</label>} */}
    <input
      placeholder={label}
      className="custom-input"
      type={type}
      onChange={handleChange}
      value={value}
      {...otherProps}
    />
  </div>
);

export default Input;
