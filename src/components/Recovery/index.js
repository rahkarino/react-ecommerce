import React, { useState } from "react";
import Button from "../forms/Button";
import Input from "../forms/Input";
import PasswordIcon from "../../assets/password-icon.png";
import { auth } from "../../firebase/utils";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import Loading from "../../assets/loading.svg";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log("password reset");
          history.push("/login");
          setLoading(false);
        })
        .catch(() => {
          setError("Email Not Found !");
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
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
          {error && <span className="error">{error}</span>}
        </div>
      </div>
    </section>
  );
};

export default Recovery;
