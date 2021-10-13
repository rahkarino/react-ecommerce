import React, { useState, useEffect } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import Input from "../forms/Input";
import GoogleIcon from "../../assets/google-icon.png";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../redux/User/user.actions";
import Logo from "../../assets/reactland-logo.png";
import { LockClosedIcon } from "@heroicons/react/solid";

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
    <div className="flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="reactland" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User sign in
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
              name="email"
              type="email"
              label="Email"
              onChange={handleChange}
              value={email}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
              value={password}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  to="/recovery"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </Button>
          </form>
          <Button
            onClick={handleGoogleLogin}
            className="relative w-full mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <img src={GoogleIcon} alt="google" width="20" />
            </span>
            Google Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
