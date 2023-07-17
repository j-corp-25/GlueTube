import React from "react";
import buttonImage from "../assets/button.svg";
import searchImage from "../assets/zoom (1).png";

const NavBar = () => {
  return (
    <>
      <nav className="top-nav-bar normal-color">
        <a className="sandwich-nav" href=""></a>
        <a href="">
          <img className="home-button" src={buttonImage} alt="Button" />
        </a>
        <form className="search-bar">
          <input
            className="main-nav-search"
            type="text"
            placeholder="Search"
          ></input>
          <img className="search-companion-nav" src={searchImage} alt="Button" />
        </form>

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
