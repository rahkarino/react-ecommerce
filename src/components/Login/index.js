import React, { useState } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { signInWithGoogle, auth } from "../../firebase/utils";
import GoogleIcon from "../../assets/google-icon.png";
import LoginIcon from "../../assets/login-icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    try {
      if (email === "" || password === "") {
        setFormValues((prevState) => {
          return {
            ...prevState,
            error: "email and pass required",
          };
        });
      } else {
        setFormValues((prevState) => {
          return {
            ...prevState,
            error: "",
          };
        });
        await auth
          .signInWithEmailAndPassword(email, password)
          .then(() => console.log("loggedIn"))
          .catch((error) => {
            console.log("errrr: ", error.message);
          });
        setFormValues({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log("errr: ", err);
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
  const { email, password, error } = formValues;
  return (
    <section className="login">
      <div className="container">
        <div className="user-form">
          <h2>User Signin</h2>
          {error && <span className="error">{error}</span>}
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
          <Button onClick={signInWithGoogle}>
            <img src={GoogleIcon} alt="google" /> Google Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
