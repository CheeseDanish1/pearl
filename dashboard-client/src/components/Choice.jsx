import React from 'react';
import {Link} from 'react-router-dom';

const idk = (active, name) => (
  <div
    className={`choice ${active ? 'active' : ''}`}
    style={{
      color: '#d3d3d3',
      margin: '0',
      padding: '0',
      fontSize: '20px',
      // textDecoration: 'none',
      fontFamily: 'Montserrat',
    }}
  >
    {name}
  </div>
);

const enter = e => (e.target.style.color = '#5BC0EB');
const exit = e => (e.target.style.color = '#d3d3d3');

const Choice = ({name, page, type}) => {
  let active = page === window.location.pathname;

  if (type === 'mobile') {
    if (!page.includes('http'))
      return (
        <Link to={page} style={{color: 'inherit'}}>
          <div
            className={`menu-mobile-list-element ${
              active ? 'list-active' : ''
            }`}
          >
            {name}
            {/* {name} */}
          </div>
        </Link>
      );

    return (
      <a
        href={page}
        rel="noreferrer"
        style={{color: 'inherit'}}
        target="_blank"
      >
        <div
          className={`menu-mobile-list-element ${active ? 'list-active' : ''}`}
        >
          {name}
        </div>
      </a>
    );
  }

  if (!page.includes('http'))
    return (
      <Link onMouseLeave={exit} onMouseEnter={enter} to={page}>
        {idk(active, name)}
      </Link>
    );
  return (
    <a
      onMouseLeave={exit}
      onMouseEnter={enter}
      target="_blank"
      rel="noreferrer"
      href={page}
    >
      {idk(active, name)}
    </a>
  );
};

export default Choice;
