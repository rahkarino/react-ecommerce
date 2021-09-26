import React, { useState } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { signInWithGoogle, auth } from "../../firebase/utils";
import GoogleIcon from "../../assets/google-icon.png";
import LoginIcon from "../../assets/register-icon.png";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setFormValues({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
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
  const { email, password } = formValues;
  return (
    <section className="login">
      <div className="container">
        <div className="user-form">
          <h2>User Signin</h2>
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
            <Button onClick={signInWithGoogle}>
              <img src={GoogleIcon} alt="google" /> Google Login
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
