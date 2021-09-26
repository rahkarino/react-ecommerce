import React, { useState } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { auth, handleUserProfile } from "../../firebase/utils";
import RegisterIcon from "../../assets/register-icon.png";

const Register = (props) => {
  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      const errors = ["Password don't match"];
      setFormValues((prevState) => {
        return {
          ...prevState,
          errors,
        };
      });
    } else {
      setFormValues((prevState) => {
        return {
          ...prevState,
          errors: [],
        };
      });
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await handleUserProfile(user, { displayName });
        setFormValues({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          errors: [],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="register">
      <div className="container">
        <div className="user-form">
          <h2>User Signup</h2>
          {formValues.errors && (
            <ul className="errors">
              {formValues.errors.map((err, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default Register;
