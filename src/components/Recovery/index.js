import React, { useState, useEffect } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import PasswordIcon from "../../assets/password-icon.png";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import Loading from "../../assets/loading.svg";
import {
  resetPassword,
  resetAllAuthForms,
} from "../../redux/User/user.actions";
import { useSelector, useDispatch } from "react-redux";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { resetPasswordError, resetPasswordSuccess } = useSelector(mapState);

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
    <section className="recovery">
      <div className="container">
        <div className="user-form">
          <h2>Password Recovery</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={handleChange}
              value={email}
            />
            <Button>
              <img src={PasswordIcon} alt="password" /> Send
            </Button>
          </form>
          {loading && <img src={Loading} width="50" />}
          {errors && (
            <ul className="errors">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recovery;
