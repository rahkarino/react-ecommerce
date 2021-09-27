import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.jpg";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
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
            {currentUser ? (
              <>
                <li>
                  <Link to="/dashboard">My Account</Link>
                </li>
                <li>
                  <span
                    onClick={() => {
                      auth.signOut();
                      dispatch(setCurrentUser(null));
                      history.push("/login");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </li>
              </>
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
