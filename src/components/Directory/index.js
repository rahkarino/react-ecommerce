import React from "react";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="container">
        <div className="item">
          <a href="#">Women Shopping</a>
        </div>
        <div className="item">
          <a href="#">Men Shopping</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
