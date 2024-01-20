import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className='my-3'>
        <div className='container'>
          <div className='header-wrapper'>
            <Link to='/'>
              <img
                src='https://via.placeholder.com/100x50'
                alt='SiteLogo'
                width={100}
                height={50}
              />
            </Link>
            <nav className='header-wrapper__site-navbar'>
              <ul className='header-wrapper__nav-list '>
                <li className='header-wrapper__nav-item'>
                  <Link className='header-wrapper__nav-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className='header-wrapper__nav-item'>
                  <Link className='header-wrapper__nav-link' to='/about'>
                    About
                  </Link>
                </li>
                <li className='header-wrapper__nav-item'>
                  <Link className='header-wrapper__nav-link' to='/services'>
                    Services
                  </Link>
                </li>
                <li className='header-wrapper__nav-item'>
                  <Link className='header-wrapper__nav-link' to='/team'>
                    Team
                  </Link>
                </li>
                <li className='header-wrapper__nav-item'>
                  <Link className='header-wrapper__nav-link' to='/contact'>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
