import React from 'react';
import {Link} from 'react-router-dom';

const SidebarComp = ({index, item}) => {
  return (
    <li key={index} className="nav-text">
      <Link
        to={item.path}
        className={
          window.location.href.includes(item.path) ? 'nav-text-active' : ''
        }
      >
        {item.icon}
        <span className="nav-title">{item.title}</span>
      </Link>
    </li>
  );
};

export default SidebarComp;
