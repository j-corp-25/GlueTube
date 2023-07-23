import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import googleLogo from "../../assets/GlooGle2.svg";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.signup({ username, email, password, firstName, lastName })
    );
  };
  return (
    <div className="page-container">
      <div className="signup-container">
        <figure className="logo-container">
          <img className="gloogle-logo" src={googleLogo} />
        </figure>
        <h2 className="signin-header">Create a GlueTube account</h2>
        <p className="signin-subheader"> Enter your name</p>
        <form className="signup-form" onSubmit={handleSubmit}>
        <>
        <input
        className="signup-input first-name"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />
        <input
        className="signup-input last-name"
        type="text"
        placeholder="Last Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />




        </>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
