import React from "react";
import buttonImage from "../../assets/button.svg";
import searchImage from "../../assets/zoom (1).png";
import signinIMG from "../../assets/SignImage.svg";

import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if (sessionUser) {
    return (
      <>
        <nav className="top-nav-bar normal-color">
          <a href="">
            <img className="home-button" src={buttonImage} alt="Button" />
          </a>
          <form className="search-bar">
            <input
              className="main-nav-search"
              type="text"
              placeholder="Search"
            ></input>
            <img
              className="search-companion-nav"
              src={searchImage}
              alt="Button"
            />
          </form>
          <div className="right-nav">
            <input type="button" value="Upload"></input>
            <input type="button" value="settings"></input>
            <input type="button" value="Profile"></input>
            <div> </div>
            <input type="button" value="Sign Out" onClick={handleClick}></input>
          </div>
        </nav>
      </>
    );
  }
  return (
    <>
      <nav className="top-nav-bar normal-color">
        <a href="">
          <img className="home-button" src={buttonImage} alt="Button" />
        </a>
        <form className="search-bar">
          <input
            className="main-nav-search"
            type="text"
            placeholder="Search"
          ></input>
          <img
            className="search-companion-nav"
            src={searchImage}
            alt="Button"
          />
        </form>
        <div className="right-nav">
          {/* <input type="button" value="Upload"></input> */}
          <input type="button" value="settings"></input>
          {/* <input type="button" value="Profile"></input> */}
              <Link to="/login">
          <div className="home-sign-in">
            <figure>
              <span>Sign In</span>
            </figure>
                <img src={signinIMG} alt="Button" />
          </div>
              </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
