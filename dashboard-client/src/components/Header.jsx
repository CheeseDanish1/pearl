import React from 'react';
import {Layout} from 'antd';
import Choice from './Choice';
import './Header.css';

const {Header: HeaderComp} = Layout;

const Header = ({isLoggedIn, shadow}) => {
  let style = {};
  if (shadow) style.boxShadow = '0 0 5px rgba(0, 0, 0, .35)';

  return (
    // <div className="header">
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
          <Choice name={isLoggedIn ? 'Account' : 'Login'} page="/account" />
        </div>
      </div>
    </HeaderComp>
    // </div>
  );
};

export default Header;
