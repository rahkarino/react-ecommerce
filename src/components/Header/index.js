import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";

const Header = (props) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <ul>
            {props.currentUser ? (
              <li>
                <span
                  onClick={() => auth.signOut()}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
