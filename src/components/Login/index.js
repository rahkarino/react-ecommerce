import React, { Component } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import { signInWithGoogle } from "../../firebase/utils";

export default class Login extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <section className="login">
        <div className="container">
          <div className="signin-form">
            <h2>User Signin</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <Button onClick={signInWithGoogle}>Google Login</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
