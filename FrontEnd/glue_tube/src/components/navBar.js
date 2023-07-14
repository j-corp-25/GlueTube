import React from "react";
import buttonImage from "../assets/button.svg";

const NavBar = () => {
  return (
    <>
      <nav className="top-nav-bar normal-color">
        <a href="">
          <img className="home-button" src={buttonImage} alt="Button" />
        </a>
        <div className="search-bar">
          <input
            className="main-nav-search"
            type="text"
            placeholder="Search"
          ></input>
          <input className="search-companion-nav" type="submit" value="Search"></input>
        </div>

        <div className="right-nav">
          <input type="button" value="Upload"></input>
          <input type="button" value="settings"></input>
          <input type="button" value="Profile"></input>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

{
  /* <a href="default.asp"><img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;"></a> */
}
