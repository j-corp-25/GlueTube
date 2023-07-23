import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import googleLogo from "../../assets/GlooGle2.svg";
import "./SignUpForm.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showBasicInfo, setShowBasicInfo] = useState(false);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.signup({ username, email, password, first_name: firstName, last_name: lastName })
    );
  };
  return (
    <div className="page-container">
      <div className="signup-container-full">
        <figure className="logo-container">
          <img className="gloogle-logo" src={googleLogo} />
        </figure>
        <h2 className="signup-header">{showBasicInfo ? "Enter Basic Info" : "Create a GlueTube account"}</h2>
        <p className="signup-subheader">{showBasicInfo ? "Please enter your email, username, and password" : "Enter your name"}</p>
        <form className="signup-form" onSubmit={handleSubmit}>
        {!showBasicInfo ? (
          <>
            <input
              className="signup-input first-name "
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <button
              className="next-button-signup"
              type="button"
              onClick={() => setShowBasicInfo(true)}
            >
              Next
            </button>
          </>
        ) : (
            <>
              <button
                className="back-button-signup"
                type="button"
                onClick={() => setShowBasicInfo(false)}
              >
                Back
              </button>
              <input
                className="signup-input email-input-signup"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
              <input
                className="signup-input username-input-signup"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                className="signup-input password-input-signup"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <button className="signup-button" type="submit">
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
