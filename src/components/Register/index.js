import React, { useState, useEffect } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser, resetAllAuthForms } from "../../redux/User/user.actions";
import Logo from "../../assets/reactland-logo.png";

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
    <div className=" flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="reactland" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User sign up
          </h2>
          {currentUser ? (
            <Redirect to="/dashboard" />
          ) : (
            errors &&
            errors.map((err, index) => (
              <div
                key={index}
                className="bg-red-100 mt-4 border border-red-400 text-red-700 px-4 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">{err}</span>
              </div>
            ))
          )}
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <Input
              name="displayName"
              type="text"
              label="Full Name"
              onChange={handleChange}
              value={displayName}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={handleChange}
              value={email}
              className="appearance-none   relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
              value={password}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              onChange={handleChange}
              value={confirmPassword}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </span>
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
