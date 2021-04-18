import React from 'react';
import {Layout} from 'antd';
import Choice from './Choice';
import './Header.css';
import {FaBars} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const {Header: HeaderComp} = Layout;

const Header = ({isLoggedIn, shadow}) => {
  const [visible, setVisible] = React.useState(false);
  let style = {};
  if (shadow) style.boxShadow = '0 0 5px rgba(0, 0, 0, .35)';

  let width = getWidth();
  if (width < 601) {
    setTimeout(() => {
      let box = document.querySelector('.box') ||
        document.querySelector('.dash-box') || {style: {overflow: ''}};
      if (
        Array.from(
          document.querySelector('.mobile-nav-menu-real').classList
        ).includes('visible')
      ) {
        box.style.overflow = 'hidden';
      } else if (box.style.overflow === 'hidden') box.style.overflow = '';
    }, 100);
  }

  return (
    <>
      <HeaderComp className="header-header" style={style}>
        <div className="header-w-100">
          <div className="header-selection">
            <Choice name="Home" page="/" />
            <Choice name="Manage" page="/menu" />
            <Choice
              name="Invite"
              page={`https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot%20applications.commands&permissions=8`}
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
          <div className="header-mobile">
            <Link to="/">
              <h3>Pearl</h3>
            </Link>
            <div className="bars-mobile-icon">
              <FaBars onClick={() => setVisible(prev => !prev)} />
            </div>
          </div>
        </div>
      </HeaderComp>
      <div className="spot"></div>
      <div
        className={`mobile-nav-menu-real ${!visible ? 'invisible' : 'visible'}`}
        style={{
          width: '100%',
          position: 'absolute',
          backgroundColor: '#202225',
          zIndex: '999',
          height: 'calc(100vh - 64px)',
        }}
      >
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Choice name="Home" page="/" type="mobile" />
          <Choice name="Manage" page="/menu" type="mobile" />
          <Choice
            name="Invite"
            page={`https://discord.com/oauth2/authorize?client_id=732334443196317879&scope=bot%20applications.commands&permissions=8`}
            type="mobile"
          />
          <Choice
            name="Support"
            page="https://discord.gg/NGS6DmA"
            type="mobile"
          />
          <Choice name="FAQ" page="/faq" type="mobile" />
          <Choice
            name={isLoggedIn ? 'Account' : 'Login'}
            page={
              isLoggedIn ? '/account' : 'http://localhost:3001/auth/discord'
            }
            type="mobile"
          />
        </div>
      </div>
    </>
  );

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
};

export default Header;
