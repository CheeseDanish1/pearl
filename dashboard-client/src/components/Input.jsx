import React from 'react';

export default function Input({name, formik}) {
  let styledName = name[0].toUpperCase() + name.substring(1);

  return (
    <div
      className="dash-input"
      style={{
        display: 'flex',
        maxWidth: '800px',
        width: '100%',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <label
        style={{
          color: '#e3e3e3',
          fontSize: '16px',
          fontFamily: 'Montserrat',
          maxWidth: '400px',
          width: '100%',
        }}
        htmlFor={name}
      >
        {styledName}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        style={{
          border: '1px solid #1a1a1a',
          backgroundColor: '#2b2f33',
          borderRadius: '3px',
          boxShadow: 'none',
          color: 'white',
          height: '42px',
          width: '100%',
          padding: '10px 16px',
          fontSize: '16px',
        }}
      />
    </div>
  );
}
