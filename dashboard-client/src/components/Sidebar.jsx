import React from 'react';
import {SidebarData} from './SidebarData';
import './Sidebar.css';
import {IconContext} from 'react-icons';
import SidebarComp from './SidebarComp';
// import Header from './Header';

const capFirst = str =>
  str
    .split(' ')
    .map(d => d[0].toUpperCase() + d.substring(1))
    .join(' ');

function Navbar({loading, guild}) {
  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="nav-menu active-nav">
          <ul className="nav-menu-items">
            <div className="nav-main-text">
              <p className="nav-text">{capFirst(guild.name)}</p>
            </div>
            <hr />
            <br />
            {SidebarData.map((item, index) => (
              <SidebarComp key={index} item={item} index={index} />
            ))}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
