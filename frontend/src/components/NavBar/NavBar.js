import React from 'react'
import buttonImage from '../../assets/button.svg'
import searchImage from '../../assets/zoom (1).png'
import signinIMG from '../../assets/SignImage.svg'
import settingimg from '../../assets/ProfileSettings.svg'
import Avatar from 'react-avatar'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import * as sessionActions from '../../store/session'
import HomeIcon from '@mui/icons-material/Home'
import 'font-awesome/css/font-awesome.min.css'
import SearchBar from './SearchBar'

const NavBar = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)

  const demoLogin = () => {
    const demoUser = {
      credential: 'Demo-lition',
      password: 'password',
    }
    dispatch(sessionActions.login(demoUser))
  }

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(sessionActions.logout())
  }

  if (sessionUser) {
    return (
      <>
        <header>
          <nav className='top-nav-bar normal-color flex gap-2 w-[98%] mx-auto'>
            <div className='left-nav-side-container'>
              <div className='home-logo-container'>
                <Link to='/'>
                  <img
                    className='home-button '
                    src={buttonImage}
                    alt='Button'
                  />
                </Link>

                <Link to='/'>
                  <div className='home-button'>
                    <i
                      className='fa fa-home fa-2x'
                      style={{ color: '#ffffff' }}
                    ></i>
                  </div>
                </Link>
                <div className='home-button'>
                  <a href='https://www.linkedin.com/in/jcorporan/'>
                    <i
                      class='fa-brands fa-linkedin fa-2x'
                      style={{ color: '#ffffff' }}
                    ></i>
                  </a>
                </div>
                <div className='home-button'>
                  <a href='https://github.com/j-corp-25/GlueTube'>
                    <i
                      className='fa-brands fa-github fa-2x p-0'
                      style={{ color: '#ffffff' }}
                    ></i>
                  </a>
                </div>

                <div className=' md:hidden relative '>
                  <Link to='/upload' className='upload-container '>
                    <i
                      className='fa-solid fa-video fa-2x '
                      style={{ color: '#ffffff' , padding: "5px"}}
                    ></i>
                    <span className='tooltip-text '>Upload a Video</span>
                  </Link>
                </div>
                <input
                  className='home-sign-out-button bg-gray-100 md:hidden p-1 text-xs'
                  type='button'
                  value='Sign Out'
                  onClick={handleClick}
                ></input>

                {/* <div className="home-button">
                  <i
                    className="fa fa-home fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div> */}
              </div>
            </div>
            {/* ========================================================================== */}
            {/* <div className="sliding-navigation-bar-wrapper">
              <div className="sliding-navigation-bar">
                <div>
                  <button>ALL</button>
                </div>
                <div>
                  <button>Gaming</button>
                </div>
                <div>
                  <button>Sports</button>
                </div>
                <div>
                  <button>News</button>
                </div>
                <div>
                  <button>Live</button>
                </div>
                <div>
                  <button>Gadgets</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Minecraft</button>
                </div>
                <div>
                  <button>Mario</button>
                </div>
                <div>
                  <button>Cars</button>
                </div>
              </div>
            </div> */}

            <SearchBar />

            {/* <div className="nav-search-bar-container">
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
            </div> */}

            {/* ========================================================================== */}
            <div className='right-nav-signed-in'>
              <div className='profile-icon p-0'>
                <Avatar
                  name={sessionUser.username}
                  size='35'
                  round={true}
                  color={Avatar.getRandomColor('sitebase', [
                    'red',
                    'green',
                    'blue',
                  ])}
                />
              </div>
              {/* <input type="button" value="settings"></input> */}
              <div className='hidden md:inline-block px-1 py-1 size-15 text-md mx-3'>
                <Link to='/upload' className='upload-container '>
                  <i
                    class='fa-solid fa-video fa-2x'
                    style={{ color: '#ffffff' }}
                  ></i>
                  <span className='tooltip-text'>Upload a Video</span>
                </Link>
              </div>
              {/* <input type="button" value="Profile"></input> */}
              <div className='home-sign-out mx-auto'>
                <input
                  className='home-sign-out-button bg-gray-100 hidden md:inline-block px-1 py-1 size-15 text-md mx-3'
                  type='button'
                  value='Sign Out'
                  onClick={handleClick}
                ></input>
              </div>
            </div>
          </nav>
        </header>
      </>
    )
  }
  return (
    <>
      <header>
        <nav className='top-nav-bar normal-color gap-2 w-[98%] mx-auto flex justify-between items-center'>
          <div className='left-nav-side-container'>
            <div className='home-logo-container '>
              <div className=''>
                <Link to='/'>
                  <img
                    className='home-button p-0'
                    src={buttonImage}
                    alt='Button'
                  />
                </Link>
              </div>
              <Link to='/'>
                  <div className='home-button'>
                    <i
                      className='fa fa-home fa-2x'
                      style={{ color: '#ffffff' }}
                    ></i>
                  </div>
                </Link>
              <div className='home-button'>
                <i
                  class='fa-brands fa-linkedin fa-2x'
                  style={{ color: '#ffffff' }}
                ></i>
              </div>
              <div className='home-button'>
                <a href='https://github.com/j-corp-25/GlueTube'>
                  <i
                    class='fa-brands fa-github fa-2x'
                    style={{ color: '#ffffff' }}
                  ></i>
                </a>
              </div>
              <input
                className='Demouser-button bg-gray-100 md:hidden p-1 text-xs '
                onClick={demoLogin}
                type='button'
                value='Demouser'
              ></input>
              {/* <div className="home-button">
                <a href="mailto:corporan.Jordy@gmail.com?subject=General%20Inquiry">
                  <i
                    className="fa fa-envelope fa-2x"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </div> */}
            </div>
            {/* <div className='home-button-container p-0'>
              <Link to='/'>
                <img className='home-button ' src={buttonImage} alt='Button' />
              </Link>
            </div> */}
          </div>

          {/* <div className="sliding-navigation-bar-wrapper">
            <div className="sliding-navigation-bar">
              <div>
                <button>ALL</button>
              </div>
              <div>
                <button>Gaming</button>
              </div>
              <div>
                <button>Sports</button>
              </div>
              <div>
                <button>News</button>
              </div>
              <div>
                <button>Live</button>
              </div>
              <div>
                <button>Gadgets</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Minecraft</button>
              </div>
              <div>
                <button>Mario</button>
              </div>
              <div>
                <button>Cars</button>
              </div>
            </div>
          </div> */}

          <SearchBar />

          {/* <div className="nav-search-bar-container">
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
          </div> */}
          <div className='right-nav md:static'>
            <input
              className='Demouser-button bg-gray-100 hidden md:inline-block px-1 py-1 size-15 text-md mx-3'
              onClick={demoLogin}
              type='button'
              value='Demouser'
            ></input>
            {/* <input type="button" value="Upload"></input> */}
            {/* <div className="settings-container">
              <figure className="settings-subcontainer">
                <img
                  className="settings-button"
                  src={settingimg}
                  alt="Button"
                />
              </figure>
            </div> */}
            {/* <input type="button" value="Profile"></input> */}
            <Link to='/login'>
              <div className='home-sign-in'>
                <figure>
                  <span className=' hidden md:inline-block md:text-xs '>
                    Sign In
                  </span>
                </figure>
                <img src={signinIMG} className='w-[35px] sm:w-[25px]' alt='Button' />
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default NavBar
