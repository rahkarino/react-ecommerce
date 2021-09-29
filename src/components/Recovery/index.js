import React, { useState, useEffect } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import PasswordIcon from "../../assets/password-icon.png";
import { useHistory, Redirect } from "react-router-dom";
import "./styles.scss";
import Loading from "../../assets/loading.svg";
import {
  resetPassword,
  resetAllAuthForms,
} from "../../redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/reactland-logo.png";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { resetPasswordError, resetPasswordSuccess, currentUser } =
    useSelector(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      history.push("/login");
      setLoading(false);
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    setLoading(false);
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="reactland" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
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
            <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </span>
              Submit
            </Button>
          </form>
          {loading && <img src={Loading} width="50" />}
        </div>
      </div>
    </div>
  );
};

export default Recovery;
