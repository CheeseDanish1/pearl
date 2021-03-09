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

const Choice = ({name, page}) => {
  let active = page === window.location.pathname;

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
