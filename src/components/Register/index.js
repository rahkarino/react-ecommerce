import React, { useState, useEffect } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import RegisterIcon from "../../assets/register-icon.png";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser, resetAllAuthForms } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const Register = (props) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const { currentUser, signUpSuccess, signUpError } = useSelector(mapState);

  const history = useHistory();

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetAllAuthForms());
      history.push("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { displayName, email, password, confirmPassword } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  return (
    <section className="register">
      <div className="container">
        <div className="user-form">
          {currentUser ? (
            <Redirect to="/dashboard" />
          ) : (
            <>
              <h2>User Signup</h2>
              {errors && (
                <ul className="errors">
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleSubmit}>
                <Input
                  name="displayName"
                  type="text"
                  label="Full Name"
                  onChange={handleChange}
                  value={displayName}
                />
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
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  onChange={handleChange}
                  value={confirmPassword}
                />
                <Button>
                  <img src={RegisterIcon} alt="register" /> Register
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
