import React from 'react';
import Select from 'react-select';

export default function Input({
  name,
  value,
  onFinish,
  type,
  state,
  guild,
  guilds,
  options,
  setState,
}) {
  let styledName = name[0].toUpperCase() + name.substring(1);
  const handleChange = q => setState(q);

  if (type === 'text')
    return (
      <div
        className="dash-input norm-input"
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
          onBlur={e => onFinish(e, guild, guilds)}
          type="text"
          name={name}
          id={name}
          className="dash-input"
          defaultValue={value}
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
  else if (type === 'multi') {
    return (
      <div
        className="norm-input"
        style={{
          display: 'flex',
          maxWidth: '800px',
          width: '100%',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <p
          style={{
            color: '#e3e3e3',
            fontSize: '16px',
            fontFamily: 'Montserrat',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {name}
        </p>
        <Select
          value={state}
          isMulti={true}
          options={options}
          onChange={handleChange}
          isSearchable={true}
          name="ice"
          theme={t => ({
            ...t,
            borderRadius: 0,
            colors: {
              ...t.colors,
              primary: '#1a1a1a',
              neutral20: '#1a1a1a',

              neutral0: '#2b2f33',

              primary25: '#212326',
              neutral5: '#212326',
              neutral10: '#212326',

              neutral60: '#e3e3e3',
              neutral70: '#e3e3e3',
              neutral80: '#e3e3e3',
            },
          })}
          onBlur={() => onFinish(state, guild, guilds)}
          className="multi-select"
        />
      </div>
    );
  } else if (type === 'input') {
    return (
      <div
        className="norm-input"
        style={{
          display: 'flex',
          maxWidth: '800px',
          width: '100%',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <p
          style={{
            color: '#e3e3e3',
            fontSize: '16px',
            fontFamily: 'Montserrat',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {name}
        </p>
        <Select
          value={state}
          isMulti={false}
          options={options}
          onChange={handleChange}
          isSearchable={true}
          name={name}
          onBlur={() => onFinish(state, guild, guilds)}
          className="multi-select"
          theme={t => ({
            ...t,
            borderRadius: 0,
            colors: {
              ...t.colors,
              // primary: '#212326',
              neutral20: '#212326',

              neutral0: '#2b2f33',

              primary25: '#212326',
              neutral5: '#212326',
              neutral10: '#212326',

              neutral60: '#e3e3e3',
              neutral70: '#e3e3e3',
              neutral80: '#e3e3e3',
            },
          })}
        />
      </div>
    );
  }
}
