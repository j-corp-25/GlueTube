import React from "react";
import buttonImage from "../../assets/button.svg";
import searchImage from "../../assets/zoom (1).png";
import signinIMG from "../../assets/SignImage.svg";
import settingimg from "../../assets/ProfileSettings.svg";
import Avatar from "react-avatar";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import HomeIcon from "@mui/icons-material/Home";
import "font-awesome/css/font-awesome.min.css";
import { useRef } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const demoLogin = () => {
    const demoUser = {
      credential: "Demo-lition",
      password: "password",
    };
    dispatch(sessionActions.login(demoUser));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const sliderRef = useRef(null);

  const slideDrag = (e) => {
    e.preventDefault();
    sliderRef.current.scrollLeft -= (e.clientX - sliderRef.current.clientX) * 2;
    sliderRef.current.clientX = e.clientX;
  };

  const slideStop = () => {
    document.removeEventListener("mousemove", slideDrag);
    document.removeEventListener("mouseup", slideStop);
  };

  const slideStart = (e) => {
    sliderRef.current.clientX = e.clientX;
    document.addEventListener("mousemove", slideDrag);
    document.addEventListener("mouseup", slideStop);
  };

  if (sessionUser) {
    return (
      <>
        <header>
          <nav className="top-nav-bar normal-color">
            <div className="left-nav-side-container">
              <div className="home-logo-container">
                <figure className="settings-button-side-wrapper">
                  <img
                    className="settings-button-side"
                    src={settingimg}
                    alt="Button"
                  />
                </figure>
                <div className="home-button">
                  <i
                    className="fa fa-home fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                <div className="home-button">
                  <i
                    className="fa fa-home fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                <div className="home-button">
                  <i
                    className="fa fa-home fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                <div className="home-button">
                  <i
                    className="fa fa-home fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
              </div>
              <div className="home-button-container">
                <Link to="/">
                  <img className="home-button" src={buttonImage} alt="Button" />
                </Link>
              </div>
            </div>
            {/* ========================================================================== */}

            <div className="sliding-navigation-bar-wrapper">
              <div
                className="sliding-navigation-bar"
              >
                <div>
                  <button>ALL</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>

              </div>
            </div>

            <div className="nav-search-bar-container">
              <div className="search-bar-sub-container">
                <form className="search-bar">
                  <input
                    className="main-nav-search"
                    type="text"
                    placeholder="Search"
                  ></input>
                  <div className="search-container">
                    <input
                      className="search-companion-nav"
                      type="image"
                      src={searchImage}
                      alt="search-button"
                      name="submit"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
            {/* ========================================================================== */}
            <div className="right-nav-signed-in">
              <div className="profile-icon">
                <Avatar
                  name={sessionUser.username}
                  size="35"
                  round={true}
                  color={Avatar.getRandomColor("sitebase", [
                    "red",
                    "green",
                    "blue",
                  ])}
                />
              </div>
              {/* <input type="button" value="settings"></input> */}
              <Link to="/upload" className="upload-container">
                <i
                  class="fa-solid fa-video fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
                <span className="tooltip-text">Upload a Video</span>
              </Link>
              {/* <input type="button" value="Profile"></input> */}
              <input
                type="button"
                value="Sign Out"
                onClick={handleClick}
              ></input>
            </div>
          </nav>
        </header>
      </>
    );
  }
  return (
    <>
      <header>
        <nav className="top-nav-bar normal-color">
          <div className="left-nav-side-container">
            <div className="home-logo-container">
              <figure className="settings-button-side-wrapper">
                <img
                  className="settings-button-side"
                  src={settingimg}
                  alt="Button"
                />
              </figure>
              <div className="home-button">
                <i
                  className="fa fa-home fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              <div className="home-button">
                <i
                  className="fa fa-home fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              <div className="home-button">
                <i
                  className="fa fa-home fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              <div className="home-button">
                <i
                  className="fa fa-home fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            </div>
            <div className="home-button-container">
              <Link to="/">
                <img className="home-button" src={buttonImage} alt="Button" />
              </Link>
            </div>
          </div>

          <div className="sliding-navigation-bar-wrapper">
              <div
                className="sliding-navigation-bar"
              >
                <div>
                  <button>ALL</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>

              </div>
            </div>

          <div className="nav-search-bar-container">
            <div className="search-bar-sub-container">
              <form className="search-bar">
                <input
                  className="main-nav-search"
                  type="text"
                  placeholder="Search"
                ></input>
                <div className="search-container">
                  <input
                    className="search-companion-nav"
                    type="image"
                    src={searchImage}
                    alt="search-button"
                    name="submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
          <div className="right-nav">
            <input onClick={demoLogin} type="button" value="Demouser"></input>
            {/* <input type="button" value="Upload"></input> */}
            <div className="settings-container">
              <figure className="settings-subcontainer">
                <img
                  className="settings-button"
                  src={settingimg}
                  alt="Button"
                />
              </figure>
            </div>
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
      </header>
    </>
  );
};

export default NavBar;
