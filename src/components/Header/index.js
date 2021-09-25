import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.jpg";

const Header = (props) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
