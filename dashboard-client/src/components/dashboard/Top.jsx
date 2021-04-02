import React from 'react';

export default function Top({name, children}) {
  return (
    <div
      className="dash-border"
      style={{
        paddingRight: '15px',
        marginRight: 'auto',
        paddingLeft: '15px',
        marginLeft: 'auto',
        marginTop: '15px',
        marginBottom: '10px',
      }}
    >
      <h2
        className="name"
        style={{fontFamily: 'arial', fontSize: '32px', color: 'white'}}
      >
        {name}
      </h2>
      <hr />
      {children}
    </div>
  );
}
