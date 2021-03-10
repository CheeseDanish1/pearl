import React from 'react';
import {Layout} from 'antd';
import Choice from './Choice';
import './Header.css';

const {Header: HeaderComp} = Layout;

const Header = ({isLoggedIn, shadow}) => {
  let style = {};
  if (shadow) style.boxShadow = '0 0 5px rgba(0, 0, 0, .35)';

  // const navbar = document.querySelector('.header-header');
  // const spot = document.querySelector('.spot');
  // const sidebar = document.querySelector('.nav-menu');
  // if (sidebar) {
  //   console.log(sidebar);
  //   // handler
  //   const handleScroll = entries => {
  //     const spotIsVisible = entries[0].isIntersecting;

  //     if (spotIsVisible) sidebar.classList.remove('sidebar-full');
  //     else sidebar.classList.add('sidebar-full');
  //   };

  //   // options
  //   const options = {
  //     root: null, // null means that root element = browser viewport.
  //     rootMargin: '0px', // margin around the browser viewport.
  //     threshhold: 0, // see below what 0 means.
  //   };

  //   // initialize and start the observer.
  //   const observer = new IntersectionObserver(handleScroll, options);
  //   observer.observe(spot);
  // }

  return (
    <>
      {/* <div className="header"> */}
      <HeaderComp className="header-header" style={style}>
        <div className="header-w-100">
          <div className="header-selection">
            <Choice name="Home" page="/" />
            <Choice name="Manage" page="/menu" />
            <Choice
              name="Invite"
              page={`https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot&permissions=8`}
            />
            <Choice name="Support" page="https://discord.gg/NGS6DmA" />
            <Choice name="FAQ" page="/faq" />
            <Choice
              name={isLoggedIn ? 'Account' : 'Login'}
              page={
                isLoggedIn ? '/account' : 'http://localhost:3001/auth/discord'
              }
            />
          </div>
        </div>
      </HeaderComp>
      <div className="spot"></div>
      {/* </div> */}
    </>
  );
};

export default Header;
