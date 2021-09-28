import React, { useState, useEffect } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import GoogleIcon from "../../assets/google-icon.png";
import LoginIcon from "../../assets/login-icon.png";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signInSuccess: user.signInSuccess,
  signInError: user.signInError,
});

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { currentUser, signInSuccess, signInError } = useSelector(mapState);

  const { email, password } = formValues;

  const dispatch = useDispatch();

  useEffect(() => {
    if (signInSuccess) {
      dispatch(resetAllAuthForms());
      history.push("/");
      setFormValues({
        email: "",
        password: "",
      });
    }
  }, [signInSuccess]);

  useEffect(() => {
    if (Array.isArray(signInError) && signInError.length > 0) {
      setErrors(signInError);
    }
  }, [signInError]);

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogle());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    if (email === "" || password === "") {
      setErrors(["email and pass required"]);
    } else {
      dispatch(signInUser({ email, password }));
      setErrors([]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <section className="login">
      <div className="container">
        <div className="user-form">
          {currentUser ? (
            <Redirect to="/dashboard" />
          ) : (
            <>
              <h2>User Signin</h2>
              {errors && (
                <ul className="errors">
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleSubmit}>
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  onChange={handleChange}
                  value={email}
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handleChange}
                  value={password}
                />
                <Button>
                  <img src={LoginIcon} alt="login" /> Login
                </Button>

                <Link to="/recovery">Forgot Password?</Link>
              </form>
              <Button onClick={handleGoogleLogin}>
                <img src={GoogleIcon} alt="google" /> Google Login
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
